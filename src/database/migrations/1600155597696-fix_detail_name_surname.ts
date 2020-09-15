import {MigrationInterface, QueryRunner} from "typeorm";

export class fixDetailNameSurname1600155597696 implements MigrationInterface {
    name = 'fixDetailNameSurname1600155597696'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user_details` CHANGE `name` `name` varchar(50) NULL");
        await queryRunner.query("ALTER TABLE `user_details` CHANGE `lastname` `lastname` varchar(50) NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user_details` CHANGE `lastname` `lastname` varchar(50) NOT NULL");
        await queryRunner.query("ALTER TABLE `user_details` CHANGE `name` `name` varchar(50) NOT NULL");
    }

}
