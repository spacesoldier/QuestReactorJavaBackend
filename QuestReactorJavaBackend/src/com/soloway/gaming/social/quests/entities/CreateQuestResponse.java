package com.soloway.gaming.social.quests.entities;

public class CreateQuestResponse {
	private int statusCode;
	private String errorMessage;
	private int questId;
	private String questHash;
	public int getStatusCode() {
		return statusCode;
	}
	public void setStatusCode(int statusCode) {
		this.statusCode = statusCode;
	}
	public String getErrorMessage() {
		return errorMessage;
	}
	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}
	public int getQuestId() {
		return questId;
	}
	public void setQuestId(int questId) {
		this.questId = questId;
	}
	public String getQuestHash() {
		return questHash;
	}
	public void setQuestHash(String questHash) {
		this.questHash = questHash;
	}
}
