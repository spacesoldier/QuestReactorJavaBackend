DELIMITER $$
CREATE DEFINER=`root`@`%` PROCEDURE `RegAuthor`(IN new_email VARCHAR(255), OUT statuscode INT, OUT statusmessage VARCHAR(255))
BEGIN
	DECLARE tmp_uuid, new_session_token, new_quest_id varchar(255);
	DECLARE new_author_id, new_player_id int;
	
	if (select exists (select * from quest_db.emails where email = new_email COLLATE utf8_unicode_ci)) then
		set statuscode = -100;
		set statusmessage = 'Email already exists. Try to log in.';
		set session_id = -1;
		set session_token = '';
	else
		set tmp_uuid = uuid();
		insert into quest_db.emails (email,verify_code,userstatus) values (new_email COLLATE utf8_unicode_ci,tmp_uuid,'non-verified');
		
		set new_session_token = uuid();
		set new_quest_id = uuid();
		set new_player_id = -1;
		set new_author_id = last_insert_id();
	
		insert into quest_db.sessions(	quest_id, 
										author_id,
										player_id,
										curr_part,
										token,
										session_status )
							values (
										new_quest_id,
										new_author_id,
										new_player_id,
										'none',
										new_session_token,
										0
									);
		set session_id = last_insert_id();
		set session_token = new_session_token;
		set statuscode = 0;
		set statusmessage = 'OK';
	end if;
END$$
DELIMITER ;
