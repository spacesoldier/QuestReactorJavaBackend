package com.soloway.gaming.social.quests.entities;

public class CreateQuestRequest {
	private String quest_name; 
	private String session_token;
	private String new_success_text;
	private String new_fail_text;
	private int days_to_expire;
	public String getQuest_name() {
		return quest_name;
	}
	public void setQuest_name(String quest_name) {
		this.quest_name = quest_name;
	}
	public String getSession_token() {
		return session_token;
	}
	public void setSession_token(String session_token) {
		this.session_token = session_token;
	}
	public String getNew_success_text() {
		return new_success_text;
	}
	public void setNew_success_text(String new_success_text) {
		this.new_success_text = new_success_text;
	}
	public String getNew_fail_text() {
		return new_fail_text;
	}
	public void setNew_fail_text(String new_fail_text) {
		this.new_fail_text = new_fail_text;
	}
	public int getDays_to_expire() {
		return days_to_expire;
	}
	public void setDays_to_expire(int days_to_expire) {
		this.days_to_expire = days_to_expire;
	}
	
}
