package com.soloway.gaming.social.quests.server;

import java.io.IOException;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Types;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.soloway.gaming.social.quests.entities.CreateQuestRequest;
import com.soloway.gaming.social.quests.entities.CreateQuestResponse;;

public class CreateNewQuestServlet extends HttpServlet {
	/**
	 * 
	 */
	private static final long serialVersionUID = 971494669880089935L;

	public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {		
		String data = req.getParameter("data");
		CreateQuestRequest newRec = null;
		
		if (data != null){
			
			Gson gson = new Gson();
			newRec = gson.fromJson(data, CreateQuestRequest.class);
		}
		
		CreateQuestResponse regResult = new CreateQuestResponse();
		
		if (newRec != null){
			
			try {
				Class.forName("com.mysql.jdbc.GoogleDriver");
			} catch (ClassNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			String url = "jdbc:google:mysql://questreactorbackend:questreactordb:3306/quest_db"; //?user=root";
			
			try {
				Connection conn = DriverManager.getConnection(url,"root","rdtcns");
				try {
					String call = "{call quest_db.create_quest(?,?,?,?,?,?,?,?,?)}";
					CallableStatement regAuthorCallStmt = conn.prepareCall(call);
					//set inputs
					regAuthorCallStmt.setString("quest_name", newRec.getQuest_name());
					regAuthorCallStmt.setString("session_token", newRec.getSession_token());
					regAuthorCallStmt.setString("new_success_text", newRec.getNew_success_text());
					regAuthorCallStmt.setString("new_fail_text", newRec.getNew_fail_text());
					regAuthorCallStmt.setInt("days_to_expire", newRec.getDays_to_expire());
					
					//configure outputs
					regAuthorCallStmt.registerOutParameter("quest_id", Types.INTEGER);
					regAuthorCallStmt.registerOutParameter("quest_hash", Types.VARCHAR);
					regAuthorCallStmt.registerOutParameter("statuscode", Types.INTEGER);
					regAuthorCallStmt.registerOutParameter("statusmessage", Types.VARCHAR);
					
					boolean hadResults = regAuthorCallStmt.execute();
					
					// let it be here as sample for processing the reslut set of procedure,
					// if there any valuable select statements inside it
					/*while (hadResults){
						ResultSet rs = loginCallStmt.getResultSet();
						//process result set
						hadResults = loginCallStmt.getMoreResults();
					}*/
					
					regResult.setQuestId(regAuthorCallStmt.getInt("quest_id"));
					regResult.setQuestHash(regAuthorCallStmt.getString("quest_hash"));
					regResult.setStatusCode(regAuthorCallStmt.getInt("statuscode"));
					regResult.setErrorMessage(regAuthorCallStmt.getString("statusmessage"));
					
					
				} finally {
					conn.close();
				}
	
				
				
			} catch(SQLException e){
				regResult.setStatusCode(-2);
				regResult.setErrorMessage("Error: DB error. "+e.getMessage());
				regResult.setQuestId(-1);
				regResult.setQuestHash("none");
				e.printStackTrace();
			}
			
			

			// STUB
			/*regResult.setUserId("1111111111");
			regResult.setSessionId("1234567890");
			regResult.setToken("ABCDEFGHIJKLMN123456789");
			regResult.setStatusCode(0);
			regResult.setErrorMessage("OK");*/
			
			
		} else {
			
			regResult.setQuestId(-1);
			regResult.setQuestHash("none");
			regResult.setStatusCode(-1);
			regResult.setErrorMessage("Error: No data or wrong data format");
		}
		
		Gson gson = new Gson();
		String regResultStr = gson.toJson(regResult);
		
		
		String callback = req.getParameter("callback");
		if (callback == null){
			resp.setContentType("application/json");
			resp.getWriter().write(regResultStr);
		} else {
			resp.getWriter().write(callback+"("+regResultStr+")");
		}

	}

		
}