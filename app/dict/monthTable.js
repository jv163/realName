/*
 * @Date: 2019-11-29 10:48:57
 * @LastEditors: JV
 * @LastEditTime: 2020-09-15 11:17:34
 */

module.exports = {
    table_names: ['real_names', 'process_infos', 'push_logs', 'fail_logs'],

    "real_names": (month, month1, next_month1) => {
        return `
        CREATE TABLE real_names_${month} () inherits (real_names); 
        CREATE INDEX "real_names_${month}_created_at" ON "real_names_${month}" USING btree ("created_at");
        CREATE INDEX "real_names_${month}_id" ON "real_names_${month}" USING btree ("id");
        CREATE INDEX "real_names_${month}_delivery_no" ON "real_names_${month}" USING btree ("delivery_no");
        CREATE INDEX "real_names_${month}_s_sid" ON "real_names_${month}" USING btree ("s_sid");
        CREATE INDEX "real_names_${month}_s_phone" ON "real_names_${month}" USING btree ("s_phone");
        CREATE INDEX "real_names_${month}_r_phone" ON "real_names_${month}" USING btree ("r_phone");
        CREATE INDEX "real_names_${month}_create_time" ON "real_names_${month}" USING btree ("create_time");
        ALTER TABLE real_names_${month} ADD CONSTRAINT real_names_${month}_check_date_key  CHECK (created_at >= '${month1}'::timestamptz);  
        CREATE
            OR REPLACE RULE real_names_${month}_created_at_rule AS ON INSERT TO real_names
        WHERE
            new.created_at >= '${month1}' :: timestamptz AND new.created_at < '${next_month1}' :: timestamptz DO
            INSTEAD INSERT INTO real_names_${month}
        VALUES
        (
            new.id, new.delivery_no, new.province, new.city, new.s_address, new.s_name, new.s_phone, new.s_sid, new.s_sex, new.s_nationality, new.r_address, new.r_name, new.r_phone, new.r_sid, new.r_sex, new.p_name, new.p_sid, new.p_phone, new.create_time, new.created_at, new.updated_at, new.timestamp,new.description, new.company, new.branch, new.brand, new.type, new.order_id, new.s_regarea, new.r_regarea, new.access_branch, new.access_time, new.access_postman, new.access_phone, new.access_sid, new.weight, new.pay, new.pay_type
        );`
    },

    "process_infos": (month, month1, next_month1) => {
        return `
        CREATE TABLE process_infos_${month} () inherits (process_infos); 
        CREATE INDEX "process_infos_${month}_created_at" ON "public"."process_infos_${month}" USING btree ("created_at");
        CREATE INDEX "process_infos_${month}_id" ON "public"."process_infos_${month}" USING btree ("id");
        CREATE INDEX "process_infos_${month}_delivery_no" ON "public"."process_infos_${month}" USING btree ("delivery_no");
        CREATE INDEX "process_infos_${month}_company_name" ON "public"."process_infos_${month}" USING btree ("company_name");
        ALTER TABLE process_infos_${month} ADD CONSTRAINT process_infos_${month}_check_date_key  CHECK (created_at >= '${month1}'::timestamptz); 
        CREATE
            OR REPLACE RULE process_infos_${month}_created_at_rule AS ON INSERT TO process_infos
        WHERE
            new.created_at >= '${month1}' :: timestamptz AND new.created_at < '${next_month1}' :: timestamptz DO
            INSTEAD INSERT INTO process_infos_${month}
        VALUES
        (
            new.id, new.delivery_no, new.create_time, new.created_at, new.updated_at, new.process_status, new.process_info, new.province, new.city, new.district, new.province_source, new.city_source, new.district_source, new.province_target, new.city_target, new.district_target, new.district_address, new.company_name
        );`
    },

    "push_logs": (month, month1, next_month1) => {
        return `
        CREATE TABLE push_logs_${month} () inherits (push_logs); 
        CREATE INDEX "push_logs_${month}_created_at" ON "public"."push_logs_${month}" USING btree ("created_at");
        CREATE INDEX "push_logs_${month}_secret_id" ON "public"."push_logs_${month}" USING btree ("secret_id");
        CREATE INDEX "push_logs_${month}_company_name" ON "public"."push_logs_${month}" USING btree ("company_name");
        ALTER TABLE push_logs_${month} ADD CONSTRAINT push_logs_${month}_check_date_key  CHECK (created_at >= '${month1}'::timestamptz);  
        CREATE
            OR REPLACE RULE push_logs_${month}_created_at_rule AS ON INSERT TO push_logs
        WHERE
	        new.created_at >= '${month1}' :: timestamptz AND new.created_at < '${next_month1}' :: timestamptz DO
	        INSTEAD INSERT INTO push_logs_${month}
        VALUES
	    (
		    new.id, new.secret_id, new.company_name, new.body, new.url, new.status, new.result, new.created_at, new.updated_at
        );`
    },

    "fail_logs": (month, month1, next_month1) => {
        return `
        CREATE TABLE fail_logs_${month} () inherits (fail_logs); 
        CREATE INDEX "fail_logs_${month}_created_at" ON "fail_logs_${month}" USING btree ("created_at");
        CREATE INDEX "fail_logs_${month}_id" ON "fail_logs_${month}" USING btree ("id");
        CREATE INDEX "fail_logs_${month}_delivery_no" ON "fail_logs_${month}" USING btree ("delivery_no");
        CREATE INDEX "fail_logs_${month}_company_name" ON "fail_logs_${month}" USING btree ("company_name");
        ALTER TABLE fail_logs_${month} ADD CONSTRAINT fail_logs_${month}_check_date_key  CHECK (created_at >= '${month1}'::timestamptz);  
        CREATE
            OR REPLACE RULE fail_logs_${month}_created_at_rule AS ON INSERT TO fail_logs
        WHERE
            new.created_at >= '${month1}' :: timestamptz AND new.created_at < '${next_month1}' :: timestamptz DO
            INSTEAD INSERT INTO fail_logs_${month}
        VALUES
        (
            new.id, new.company_name, new.delivery_no, new.data_type, new.error_info, new.created_at, new.updated_at
        );`
    },
}