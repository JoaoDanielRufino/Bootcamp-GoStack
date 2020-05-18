// To create a migration: yarn typeorm migration:create -n MigrationName
// To run a migration: yarn typeorm migration:run

import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateAppointments1589827845680 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: 'appointments',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'provider',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'date',
                    type: 'timestamp with time zone',
                    isNullable: false
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('appointments');
    }

}
