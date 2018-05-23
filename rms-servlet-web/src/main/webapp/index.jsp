<%@ page language="java" pageEncoding="UTF-8" session="true"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">

  <title>RMS</title>
  <meta name="description" content="Index">
  <meta name="author" content="Mitrais">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <%-- <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  <link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.indigo-pink.min.css">
  <script defer src="https://code.getmdl.io/1.3.0/material.min.js"></script> --%>
  <link rel="stylesheet" type="text/css" href="lib/Semantic-UI-CSS/semantic.min.css">
  <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.16/css/jquery.dataTables.css">
  <link rel="stylesheet" href="css/styles.css?v=1.0">  
  <script
    src="https://code.jquery.com/jquery-3.3.1.min.js"
    integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
    crossorigin="anonymous"></script>
  <script defer src="lib/Semantic-UI-CSS/semantic.min.js"></script>
  <script defer src="https://cdn.datatables.net/1.10.16/js/jquery.dataTables.js"></script>
  
  <!--[if lt IE 9]>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.js"></script>
  <![endif]-->
</head>

<body>
  <!-- Main Container  -->
  <div class="ui container">
    <!-- Main Header menu -->
    <%@ include file="WEB-INF/jsp/admin/header.jsp" %>

    <!-- TODO: Should check cookie/session for user object with valid role. Otherwise, kick to login page' -->
    <c:if test="${empty user}">
      <%@ include file="WEB-INF/jsp/admin/index.jsp" %>
    </c:if>

  </div>
  <script src="js/main.js"></script>
</body>
</html>
