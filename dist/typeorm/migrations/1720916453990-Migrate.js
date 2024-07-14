"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migrate1720916453990 = void 0;
const typeorm_1 = require("typeorm");
class Migrate1720916453990 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "users",
            columns: [
                {
                    name: "uuid",
                    type: "string",
                    isPrimary: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: "name",
                    type: "varchar",
                },
                {
                    name: "email",
                    type: "varchar",
                },
                {
                    name: "password",
                    type: "varchar",
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'deleted_at',
                    type: 'timestamp',
                    isNullable: true,
                },
            ],
        }), true);
        await queryRunner.createIndex("users", new typeorm_1.TableIndex({
            name: "IDX_USER_EMAIL",
            columnNames: ["email"]
        }));
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable("users");
        await queryRunner.dropTable("users");
        await queryRunner.dropIndex("users", "IDX_USER_EMAIL");
    }
}
exports.Migrate1720916453990 = Migrate1720916453990;
//# sourceMappingURL=1720916453990-Migrate.js.map