DELIMITER $$
CREATE DEFINER=`root`@`%` PROCEDURE `RegAuthor`(IN new_email VARCHAR(255), OUT statuscode INT, OUT statusmessage VARCHAR(255))
BEGIN
	DECLARE tmp_uuid varchar(255);
	
	if (select exists (select * from quest_db.emails where email = new_email)) then
		set statuscode = -100;
		set statusmessage = "Email already exists";
	else
		set tmp_uuid = uuid();
		insert into quest_db.emails (email,verify_code,status) values (new_email,tmp_uuid,"non-verified");
		set statuscode = 0;
		set statusmessage = "OK";
	end if;
END$$
DELIMITER ;