package com.soloway.gaming.social.quests.server;
import java.io.IOException;
import java.sql.*;
import java.sql.SQLException;

import javax.servlet.http.*;

import com.google.gson.Gson;
import com.soloway.gaming.social.quests.entities.RegAuthorRequest;
import com.soloway.gaming.social.quests.entities.RegAuthorResponse;

@SuppressWarnings("serial")
public class RegAuthorServlet extends HttpServlet {
	public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		
		String data = req.getParameter("data");
		RegAuthorRequest newRec = null;
		
		if (data != null){
			
			Gson gson = new Gson();
			newRec = gson.fromJson(data, RegAuthorRequest.class);
		}
		
		RegAuthorResponse regResult = new RegAuthorResponse();
		
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
					String call = "{call quest_db.RegAuthor(?,?,?)}";
					CallableStatement regAuthorCallStmt = conn.prepareCall(call);
					//set inputs
					regAuthorCallStmt.setString("new_email", newRec.getNewEmail());
					
					//configure outputs
					//regAuthorCallStmt.registerOutParameter("id_user", Types.INTEGER);
					//regAuthorCallStmt.registerOutParameter("new_session_id", Types.INTEGER);
					//regAuthorCallStmt.registerOutParameter("new_token", Types.VARCHAR);
					regAuthorCallStmt.registerOutParameter("statuscode", Types.INTEGER);
					regAuthorCallStmt.registerOutParameter("errormessage", Types.VARCHAR);
					
					boolean hadResults = regAuthorCallStmt.execute();
					
					// let it be here as sample for processing the reslut set of procedure,
					// if there any valuable select statements inside it
					/*while (hadResults){
						ResultSet rs = loginCallStmt.getResultSet();
						//process result set
						hadResults = loginCallStmt.getMoreResults();
					}*/
					
					//regResult.setUserId(String.valueOf(loginCallStmt.getInt("id_user")));
					//regResult.setSessionId(String.valueOf(loginCallStmt.getInt("new_session_id")));
					//regResult.setToken(loginCallStmt.getString("new_token"));
					regResult.setStatusCode(regAuthorCallStmt.getInt("statuscode"));
					regResult.setErrorMessage(regAuthorCallStmt.getString("errormessage"));
					
					
				} finally {
					conn.close();
				}
	
				
				
			} catch(SQLException e){
				e.printStackTrace();
			}
			
			

			// STUB
			/*regResult.setUserId("1111111111");
			regResult.setSessionId("1234567890");
			regResult.setToken("ABCDEFGHIJKLMN123456789");
			regResult.setStatusCode(0);
			regResult.setErrorMessage("OK");*/
			
			
		} else {
			
			//regResult.setUserId("-1");
			//regResult.setSessionId("-1");
			regResult.setStatusCode(-1);
			regResult.setErrorMessage("Error: No data or wrong data format");
		}
		
		Gson gson = new Gson();
		String regResultStr = gson.toJson(regResult);
		
		resp.setContentType("application/json");
		resp.getWriter().write(regResultStr);
	
		
		
		
		//resp.setContentType("text/plain");
		//resp.getWriter().println("Hello, world");
	}
}