/*
 * @Date: 2019-11-29 10:48:57
 * @LastEditors: JV
 * @LastEditTime: 2020-05-22 16:19:14
 */

module.exports = {
    name: ['real_names', 'process_infos', 'push_logs', 'companys', 'users', 'fail_logs'],

    "real_names": `
        CREATE TABLE "real_names" (
            "id" serial,
            "delivery_no" text,
            "province" text,
            "city" text,
            "s_address" text,
            "s_name" text,
            "s_phone" text,
            "s_sid" text,
            "s_sex" text,
            "s_nationality" text,
            "r_address" text,
            "r_name" text,
            "r_phone" text,
            "r_sid" text,
            "r_sex" text,
            "p_name" text,
            "p_sid" text,
            "p_phone" text,
            "create_time" timestamptz,
            "created_at" timestamptz,
            "updated_at" timestamptz,
            "timestamp" timestamptz,
            "description" text,
            "company" text,
            "branch" text,
            "brand" text,
            "type" text,
            "order_id" text,
            "s_regarea" text,
            "r_regarea" text,
            "access_branch" text,
            "access_time" timestamptz,
            "access_postman" text,
            "access_phone" text,
            "access_sid" text,
            "weight" text,
            "pay" text,
            "pay_type" text 
        );
        CREATE INDEX "real_names_created_at" ON "real_names" USING btree ("created_at");
        CREATE INDEX "real_names_id" ON "real_names" USING btree ("id");
        CREATE INDEX "real_names_delivery_no" ON "real_names" USING btree ("delivery_no");
        CREATE INDEX "real_names_s_sid" ON "real_names" USING btree ("s_sid");
        CREATE INDEX "real_names_s_phone" ON "real_names" USING btree ("s_phone");
        CREATE INDEX "real_names_r_phone" ON "real_names" USING btree ("r_phone");
        `,

    "process_infos": `
        CREATE TABLE "process_infos" (
            "id" serial,
            "delivery_no" text,
            "create_time" timestamptz,
            "created_at" timestamptz,
            "updated_at" timestamptz,
            "process_status" text,
            "process_info" text,
            "province" text,
            "city" text,
            "district" text,
            "province_source" text,
            "city_source" text,
            "district_source" text,
            "province_target" text,
            "city_target" text,
            "district_target" text,
            "district_address" text,
            "company_name" text
        );
        CREATE INDEX "process_infos_created_at" ON "public"."process_infos" USING btree ("created_at");
        CREATE INDEX "process_infos_id" ON "public"."process_infos" USING btree ("id");
        CREATE INDEX "process_infos_delivery_no" ON "public"."process_infos" USING btree ("delivery_no");
        CREATE INDEX "process_infos_company_name" ON "public"."process_infos" USING btree ("company_name");
        `,

    "push_logs": `
        CREATE TABLE "push_logs" (
            "id" serial,
            "secret_id" text,
            "company_name" text,
            "body" json,
            "url" text,
            "status" bool,
            "result" json,
            "created_at" timestamptz,
            "updated_at" timestamptz
        );
        CREATE INDEX "push_logs_created_at" ON "public"."push_logs" USING btree ("created_at");
        CREATE INDEX "push_logs_secret_id" ON "public"."push_logs" USING btree ("secret_id");
        CREATE INDEX "push_logs_company_name" ON "public"."push_logs" USING btree ("company_name");
        `,

    "companys": `
        CREATE TABLE "companys" (
            "id" serial,
            "company_name" text,
            "secret_id" text,
            "public_key" text,
            "private_key" text,
            "status" bool,
            "created_at" timestamptz,
            "updated_at" timestamptz
        );`,

    "users": `
        CREATE TABLE "users" (
            "id" serial,
            "account" text,
            "password" text,
            "status" bool,
            "created_at" timestamptz,
            "updated_at" timestamptz
        );`,

    "fail_logs": `
        CREATE TABLE "fail_logs" (
            "id" serial,
            "company_name" text,
            "delivery_no" text,
            "data_type" text,
            "error_info" text,
            "created_at" timestamptz,
            "updated_at" timestamptz
        );
        CREATE INDEX "fail_logs_created_at" ON "fail_logs" USING btree ("created_at");
        CREATE INDEX "fail_logs_id" ON "fail_logs" USING btree ("id");
        CREATE INDEX "fail_logs_company_name" ON "fail_logs" USING btree ("company_name");
        CREATE INDEX "fail_logs_delivery_no" ON "fail_logs" USING btree ("delivery_no");
        `,

}