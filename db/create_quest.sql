DELIMITER $$
CREATE DEFINER=`root`@`%` PROCEDURE `create_quest`(	IN quest_name VARCHAR(255), 
									IN session_token VARCHAR(255),
									IN new_success_text VARCHAR(255),
									IN new_fail_text VARCHAR(255),
									IN days_to_expire INT,
									OUT statuscode INT, 
									OUT statusmessage VARCHAR(255), 
									OUT quest_id INT, 
									OUT quest_hash VARCHAR(255))
BEGIN
	DECLARE tmp_uuid, new_quest_hash, new_quest_id varchar(255);
	DECLARE new_author_id, new_player_id int;
	DECLARE new_expiration_time datetime;

	if (select exists (select * from quest_db.sessions where token = session_token COLLATE utf8_unicode_ci)) then

		set new_player_id = -1;
		select author_id into new_author_id from quest_db.sessions where token = session_token COLLATE utf8_unicode_ci limit 1;
		select DATE_ADD(NOW(),INTERVAL (days_to_expire) DAY) into new_expiration_time;
		insert into quest_db.quests(	hashnum, 
										quest_name,
										author_id,
										player_id,
										quest_status,
										is_private,
										quest_success_text,
										quest_fail_text,
										expire_timestamp,
										curr_part
									)
							values (
										new_hashnum,
										quest_name COLLATE utf8_unicode_ci,
										new_author_id,
										new_player_id,
										'created',
										new_success_text  COLLATE utf8_unicode_ci,
										new_fail_text  COLLATE utf8_unicode_ci,
										new_expiration_time,
										0
									);
		set quest_id = last_insert_id();
		set quest_hash = new_hashnum;
		set statuscode = 0;
		set statusmessage = 'OK';
		
	else
		set statuscode = -200;
		set statusmessage = 'No user exists';
		set quest_id = -1;
		set quest_hash = '';

	end if;
	

END$$
DELIMITER ;
