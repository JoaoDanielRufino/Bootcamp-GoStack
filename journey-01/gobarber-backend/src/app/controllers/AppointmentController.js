import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Appointment from '../models/Appointment';
import User from '../models/User';
import File from '../models/File';
import Notification from '../schemas/Notification';

import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

class AppointmentController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const appointments = await Appointment.findAll({
      where: { user_id: req.userId, canceled_at: null },
      order: ['date'],
      attributes: ['id', 'date', 'past', 'cancelable'],
      limit: 20,                  // Estabelecendo paginacao, 20 por vez
      offset: (page - 1) * 20,
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url']
            }
          ]
        }
      ]
    });

    return res.json(appointments);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { provider_id, date } = req.body;

    const isProvider = await User.findOne({ where: { id: provider_id, provider: true } });
    if (!isProvider) {
      return res.status(401).json({ error: 'You can only create an appointment with providers' });
    }

    if (provider_id === req.userId) {
      return res.status(400).json({ error: 'You can not create an appointment with your self' });
    }

    // O parseISO transforma a variavel date em um objeto date javascript
    // O startOfHour considera apenas a hora, dispensado os minutos e segundos
    const hourStart = startOfHour(parseISO(date));
    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    const checkAvailability = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart
      }
    });
    if (checkAvailability) {
      return res.status(400).json({ error: 'Appointment is not available' });
    }

    let appointment = null;
    appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date
    });


    const user = await User.findByPk(req.userId);
    const formattedDate = format(hourStart, "'dia' dd 'de' MMMM', as' H:mm'h'", { locale: pt });

    await Notification.create({
      content: `Novo agendamento de ${user.name} para o ${formattedDate}`,
      user: provider_id
    });

    return res.json(appointment);
  }

  async delete(req, res) {
    const appointment = await Appointment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'email']
        },
        {
          model: User,
          as: 'user',
          attributes: ['name']
        }
      ]
    });

    if (appointment.user_id !== req.userId) {
      return res.status(401).json({ error: 'You do not have permission to cancel this appointment' });
    }

    const dateWithSub = subHours(appointment.date, 2); // Subtraindo 2 horas

    if (isBefore(dateWithSub, new Date())) {
      return res.status(401).json({ error: 'You con only cancel appointmens 2 hours in advance' });
    }

    appointment.canceled_at = new Date();
    await appointment.save();   

    await Queue.add(CancellationMail.key, { appointment });

    return res.json(appointment);
  }
}

export default new AppointmentController();