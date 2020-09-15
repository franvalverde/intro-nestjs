import {MigrationInterface, QueryRunner} from "typeorm";

export class fixDateUserDetailRole1600105249120 implements MigrationInterface {
    name = 'fixDateUserDetailRole1600105249120'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_9fc134ca20766e165ad650ee74` ON `users`");
        await queryRunner.query("ALTER TABLE `user_details` CHANGE `created_at` `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `user_details` CHANGE `updated_at` `updated_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `users` CHANGE `created_at` `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `users` CHANGE `updated_at` `updated_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `roles` CHANGE `created_at` `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `roles` CHANGE `updated_at` `updated_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6)");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `roles` CHANGE `updated_at` `updated_at` timestamp(0) NULL");
        await queryRunner.query("ALTER TABLE `roles` CHANGE `created_at` `created_at` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `users` CHANGE `updated_at` `updated_at` timestamp(0) NULL");
        await queryRunner.query("ALTER TABLE `users` CHANGE `created_at` `created_at` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `user_details` CHANGE `updated_at` `updated_at` timestamp(0) NULL");
        await queryRunner.query("ALTER TABLE `user_details` CHANGE `created_at` `created_at` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP");
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_9fc134ca20766e165ad650ee74` ON `users` (`detail_id`)");
    }

}
