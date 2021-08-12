# Security / SecOps focused interview

For a security-focused interview, please examine the code samples below and opine on whatever flaws they may or may not have from a security point of view.

## Sample 1 - Auth

This api method is used when logging in. What potential issues can be seen with this code?

```kotlin
@PostMapping("/auth/api/login", produces = ["application/json"])
fun login(
    @Valid @RequestBody loginData: LoginRequest,
    request: HttpServletRequest,
    response: HttpServletResponse
): ResponseEntity<Any> {
    logger.info("Authenticating ${loginData.userID}")

    val result =
        loginService.checkLogin(username = loginData.userID, password = loginData.password)
    logger.info("Authenticating result: ${loginData.userID}: $result")

    if (result == AuthStatus.LOCKED) { // lock for 15 minutes after 3 failed attempts
        loginService.logUserActivity(
            loginData.userID,
            LogOnLogOffCode.LGON,
            false,
            UserActivityMonitoringCode.BDPW
        )
        return ResponseEntity(AuthErrorResponse(errorMessage = authStatus.description), HttpStatus.UNAUTHORIZED)
    }

    if (result == AuthStatus.FAIL) {
        loginService.logUserActivity(
            loginData.userID,
            LogOnLogOffCode.LGON,
            false,
            UserActivityMonitoringCode.BDPW
        )
        incrementLockoutAttempts(); // increment failed attempts
        return ResponseEntity(AuthErrorResponse(errorMessage = authStatus.description), HttpStatus.UNAUTHORIZED)
    }

    loginService.logUserActivity(loginData.userID, LogOnLogOffCode.LGON, true)
    createSession(
        userId = loginData.userID,
        passwordChangeRequired = false,
        response = response,
        isSecure = request.isSecure
    )

    return ResponseEntity(HttpStatus.OK)
}
```

## Sample 2 - Encryption

This is some code used for encrypting a cookie that is set for the user. No encryption algorithms are hand-written - this all uses code from the Spring framework.

```kotlin

```

## Sample 3 - Database Operation

Here is some code that retrieves contact details from the database. What might be wrong with this code, and in what scenarios can that issue, if it exists, be exploited?

```kotlin
@Repository
class ContactDetailRepository(@Informix db: Database) : DtoRepository<ContactDetail>(ContactDetail::class.java, db) {

    /**
     * Get the contact details for a user using the cf_cde_s15_getusercontactdetails function
     */
    fun getUserContactDetails(userId: String, firmId: String?): ContactDetail {
        val sql = """
            execute function cf_cde_s15_getusercontactdetails(as_user_id= $userId,
            as_firm_id = $firmId, avc_delivery_method = :deliveryMethod)
        """.trimIndent()
        return find(sql)
            .setParameter("deliveryMethod", "EMAL")
            .findOne()!!
    }

}
```
