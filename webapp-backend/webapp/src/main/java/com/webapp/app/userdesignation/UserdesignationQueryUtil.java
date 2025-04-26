package com.webapp.app.userdesignation;

public class UserdesignationQueryUtil {
	
	public static final String save_User = "INSERT INTO public.employee (uid,emp_id, emp_name, password, email_id, mobile_no) values(:code,:empid,:employeeName,:password,:emailid,:phoneno)";

	public static final String GET_CODE = "SELECT CASE WHEN MAX(uid) IS NULL THEN 'E0001' ELSE 'E' || LPAD(CAST(CAST(SUBSTRING(MAX(uid), 2) AS INT) + 1 AS TEXT), 4, '0') END AS uid FROM employee WHERE uid LIKE 'E%'";


	// read
	public static final String edit_Status = "SELECT uid AS code, emp_name AS employeeName, emp_id AS empid, password, email_id AS emailid, mobile_no AS phoneno FROM public.employee WHERE uid = ?";

	// update
	public static final String update_Status = "UPDATE public.employee SET emp_name = :employeeName, emp_id = :empid, password = :password, email_id = :emailid, mobile_no = :phoneno WHERE uid = :code";


	// delete
	public static final String delete_Status = "DELETE FROM employee where uid = ?";

	// printing list
	public static final String getList = "SELECT uid AS code, emp_name AS employeeName, emp_id AS empid, password, email_id AS emailid, mobile_no AS phoneno FROM public.employee order by uid DESC";

	public static String get_employee_Id="SELECT CONCAT('EMP', LPAD( CAST( COALESCE( MAX(CAST(SUBSTRING(emp_id, 4) AS INTEGER)),  0) + 1 AS TEXT ),   4,  '0' )) AS empid FROM employee";


	
	
}
