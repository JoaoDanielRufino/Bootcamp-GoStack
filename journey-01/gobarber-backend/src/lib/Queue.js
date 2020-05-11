// As filas colocam algumas tarefas da aplicacao em segundo plano de execucao
// Assim a aplicacao nao fica travada esperando uma resposta
// Neste caso esta sendo utilizada para enviar um e-mail
// Colocando-o em background, o tempo de resposta da aplicacao para o cliente eh muito mais rapido
// E ainda sim, podemos ter controle sobre os possiveis erros gerados

import Bee from 'bee-queue';
import CancellationMail from '../app/jobs/CancellationMail';
import redisConfig from '../config/redis';

const jobs = [CancellationMail];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => { // Inicializando a fila
      this.queues[key] = {
        bee: new Bee(key, { redis: redisConfig }),
        handle
      }
    });
  }

  add(queue, job) { // Adicionando o job na fila
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() { // Processando a fila
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];
      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }
}

export default new Queue();