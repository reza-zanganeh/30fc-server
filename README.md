# Project: 30fc

# 📁 Collection: authentication

## description : 30fc is a Football team management game

## The project has been stopped for now 🙃🙃🙃

## End-point: login-or-register

### Method: POST

> ```
> http://localhost:3000/api/v1/authentication/login-or-register
> ```

### Body (**raw**)

```json
{
  "phonenumber": "03654562135"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: register

### Method: POST

> ```
> http://localhost:3000/api/v1/authentication/register
> ```

### Headers

| Content-Type | Value                                                                                                                                                                 |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZW51bWJlciI6IjA5MjEzMjYzMzI1IiwiaWF0IjoxNjYyODg2Nzc1LCJleHAiOjE2NjI4ODcwMTV9.XYyevNwDltfsc1cbqfBzmgyQPcfAgf79JbDMmcoimAo |

### Body (**raw**)

```json
{
  "email": "resa@gmail.com",
  "otpCode": "12345",
  "fullname": "رضا زنگنه",
  "password": "123456"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: login

### Method: POST

> ```
> http://localhost:3000/api/v1/authentication/login
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                            |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| otptoken     | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZW51bWJlciI6IjAzNjU0NTYyMTM1IiwiaXNVc2VyRXhpc3RzIjp0cnVlLCJpYXQiOjE2NzM1MzQxMDIsImV4cCI6MTY3MzUzNDQwMn0.jZu_PpwB4mjWEdcrvUsQLF890mWWkj9oHF_5sxe6SiY |

### Body (**raw**)

```json
{
  "password": "123456"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: request to reset password

### Method: POST

> ```
> http://localhost:3000/api/v1/authentication/request-to-reset-password
> ```

### Body (**raw**)

```json
{}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: reset password

### Method: POST

> ```
> http://localhost:3000/api/v1/authentication/reset-password/1/62b85d868b52cc157914c0fcbf7705dfc6b5c39ab1b38c33abed53b462b6219b
> ```

### Body (**raw**)

```json
{
  "newPassword": "123456",
  "confirmNewPassword": "123456"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Collection: reserved team name

## End-point: read

### Method: GET

> ```
> http://localhost:3000/api/v1/reserved-team-name
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGV2ZWwiOiJMRVZFTDEiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYyMjc0MjEyLCJleHAiOjE4NzgyNzQyMTJ9.O33G3Zi4nNRwjLS9k7L_6xW4n-89J4VRa86BwGnwoPE |

### Query Params

| Param | value                                                                                                                                                                                 |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGV2ZWwiOiJMRVZFTDEiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYyMjc0MjEyLCJleHAiOjE4NzgyNzQyMTJ9.O33G3Zi4nNRwjLS9k7L_6xW4n-89J4VRa86BwGnwoPE |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: add

### Method: POST

> ```
> http://localhost:3000/api/v1/reserved-team-name
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGV2ZWwiOiJMRVZFTDEiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYyMjc0MjEyLCJleHAiOjE4NzgyNzQyMTJ9.O33G3Zi4nNRwjLS9k7L_6xW4n-89J4VRa86BwGnwoPE |

### Body (**raw**)

```json
{
  "name": "رئال مادرید"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: delete

### Method: DELETE

> ```
> http://localhost:3000/api/v1/reserved-team-name/22
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGV2ZWwiOiJMRVZFTDEiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYyMjc0MjEyLCJleHAiOjE4NzgyNzQyMTJ9.O33G3Zi4nNRwjLS9k7L_6xW4n-89J4VRa86BwGnwoPE |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: update

### Method: PATCH

> ```
> http://localhost:3000/api/v1/reserved-team-name/20
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGV2ZWwiOiJMRVZFTDEiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYyMjc0MjEyLCJleHAiOjE4NzgyNzQyMTJ9.O33G3Zi4nNRwjLS9k7L_6xW4n-89J4VRa86BwGnwoPE |

### Body (**raw**)

```json
{
  "name": "esteghlal"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Collection: primitive player name

## End-point: read

### Method: GET

> ```
> http://localhost:3000/api/v1/primitive-player-name
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGV2ZWwiOiJMRVZFTDEiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYyMjc0MjEyLCJleHAiOjE4NzgyNzQyMTJ9.O33G3Zi4nNRwjLS9k7L_6xW4n-89J4VRa86BwGnwoPE |

### Query Params

| Param | value                                                                                                                                                                                 |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGV2ZWwiOiJMRVZFTDEiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYyMjc0MjEyLCJleHAiOjE4NzgyNzQyMTJ9.O33G3Zi4nNRwjLS9k7L_6xW4n-89J4VRa86BwGnwoPE |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: add

### Method: POST

> ```
> http://localhost:3000/api/v1/primitive-player-name
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGV2ZWwiOiJMRVZFTDEiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYyMjc0MjEyLCJleHAiOjE4NzgyNzQyMTJ9.O33G3Zi4nNRwjLS9k7L_6xW4n-89J4VRa86BwGnwoPE |

### Body (**raw**)

```json
{
  "name": "اکبر"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: delete

### Method: DELETE

> ```
> http://localhost:3000/api/v1/primitive-player-name
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGV2ZWwiOiJMRVZFTDEiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYyMjc0MjEyLCJleHAiOjE4NzgyNzQyMTJ9.O33G3Zi4nNRwjLS9k7L_6xW4n-89J4VRa86BwGnwoPE |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: update

### Method: PATCH

> ```
> http://localhost:3000/api/v1/reserved-team-name/22
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGV2ZWwiOiJMRVZFTDEiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYyMjc0MjEyLCJleHAiOjE4NzgyNzQyMTJ9.O33G3Zi4nNRwjLS9k7L_6xW4n-89J4VRa86BwGnwoPE |

### Body (**raw**)

```json
{
  "name": "رضا"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Collection: primitive player age

## End-point: read

### Method: GET

> ```
> http://localhost:3000/api/v1/primitive-player-age
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGV2ZWwiOiJMRVZFTDEiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYyMjc0MjEyLCJleHAiOjE4NzgyNzQyMTJ9.O33G3Zi4nNRwjLS9k7L_6xW4n-89J4VRa86BwGnwoPE |

### Query Params

| Param | value                                                                                                                                                                                 |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGV2ZWwiOiJMRVZFTDEiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYyMjc0MjEyLCJleHAiOjE4NzgyNzQyMTJ9.O33G3Zi4nNRwjLS9k7L_6xW4n-89J4VRa86BwGnwoPE |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: add

### Method: POST

> ```
> http://localhost:3000/api/v1/primitive-player-age
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGV2ZWwiOiJMRVZFTDEiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYyMjc0MjEyLCJleHAiOjE4NzgyNzQyMTJ9.O33G3Zi4nNRwjLS9k7L_6xW4n-89J4VRa86BwGnwoPE |

### Body (**raw**)

```json
{
  "one": 23,
  "two": 23,
  "three": 23,
  "four": 23,
  "five": 23,
  "six": 23,
  "seven": 23,
  "eight": 23,
  "nine": 23,
  "ten": 23,
  "eleven": 23,
  "twelve": 23,
  "thirteen": 23,
  "fourteen": 23,
  "fifteen": 23,
  "sixteen": 23,
  "seventeen": 23,
  "eighteen": 23,
  "nineteen": 23,
  "twenty": 23
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: delete

### Method: DELETE

> ```
> http://localhost:3000/api/v1/primitive-player-age/1
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGV2ZWwiOiJMRVZFTDEiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYyMjc0MjEyLCJleHAiOjE4NzgyNzQyMTJ9.O33G3Zi4nNRwjLS9k7L_6xW4n-89J4VRa86BwGnwoPE |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: update

### Method: PATCH

> ```
> http://localhost:3000/api/v1/reserved-team-name/22
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGV2ZWwiOiJMRVZFTDEiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYyMjc0MjEyLCJleHAiOjE4NzgyNzQyMTJ9.O33G3Zi4nNRwjLS9k7L_6xW4n-89J4VRa86BwGnwoPE |

### Body (**raw**)

```json
{
  "name": "رضا"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Collection: primitive player power

## End-point: read

### Method: GET

> ```
> http://localhost:3000/api/v1/primitive-player-power?page=1
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGV2ZWwiOiJMRVZFTDEiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYyMjc0MjEyLCJleHAiOjE4NzgyNzQyMTJ9.O33G3Zi4nNRwjLS9k7L_6xW4n-89J4VRa86BwGnwoPE |

### Query Params

| Param | value                                                                                                                                                                                 |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGV2ZWwiOiJMRVZFTDEiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYyMjc0MjEyLCJleHAiOjE4NzgyNzQyMTJ9.O33G3Zi4nNRwjLS9k7L_6xW4n-89J4VRa86BwGnwoPE |
| page  | 1                                                                                                                                                                                     |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: add

### Method: POST

> ```
> http://localhost:3000/api/v1/primitive-player-power
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGV2ZWwiOiJMRVZFTDEiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYyMjc0MjEyLCJleHAiOjE4NzgyNzQyMTJ9.O33G3Zi4nNRwjLS9k7L_6xW4n-89J4VRa86BwGnwoPE |

### Body (**raw**)

```json
{
  "spead": 250,
  "controll": 300,
  "pass": 300,
  "flexibility": 250,
  "stamina": 200,
  "technique": 100,
  "shoot": 300,
  "drible": 250,
  "focus": 300,
  "experience": 300
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: delete

### Method: DELETE

> ```
> http://localhost:3000/api/v1/primitive-player-power/2
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGV2ZWwiOiJMRVZFTDEiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYyMjc0MjEyLCJleHAiOjE4NzgyNzQyMTJ9.O33G3Zi4nNRwjLS9k7L_6xW4n-89J4VRa86BwGnwoPE |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: update

### Method: PATCH

> ```
> http://localhost:3000/api/v1/reserved-team-name/22
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGV2ZWwiOiJMRVZFTDEiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYyMjc0MjEyLCJleHAiOjE4NzgyNzQyMTJ9.O33G3Zi4nNRwjLS9k7L_6xW4n-89J4VRa86BwGnwoPE |

### Body (**raw**)

```json
{
  "name": "رضا"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Collection: player position

## End-point: read

### Method: GET

> ```
> http://localhost:3000/api/v1/player-position
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGV2ZWwiOiJMRVZFTDEiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYyMjc0MjEyLCJleHAiOjE4NzgyNzQyMTJ9.O33G3Zi4nNRwjLS9k7L_6xW4n-89J4VRa86BwGnwoPE |

### Query Params

| Param | value                                                                                                                                                                                 |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGV2ZWwiOiJMRVZFTDEiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYyMjc0MjEyLCJleHAiOjE4NzgyNzQyMTJ9.O33G3Zi4nNRwjLS9k7L_6xW4n-89J4VRa86BwGnwoPE |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: add

### Method: POST

> ```
> http://localhost:3000/api/v1/player-position
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGV2ZWwiOiJMRVZFTDEiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYyMjc0MjEyLCJleHAiOjE4NzgyNzQyMTJ9.O33G3Zi4nNRwjLS9k7L_6xW4n-89J4VRa86BwGnwoPE |

### Body (**raw**)

```json
{
  "major": "ATTACKER",
  "manor": "MIDDLE"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: delete

### Method: DELETE

> ```
> http://localhost:3000/api/v1/player-position/3
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGV2ZWwiOiJMRVZFTDEiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYyMjc0MjEyLCJleHAiOjE4NzgyNzQyMTJ9.O33G3Zi4nNRwjLS9k7L_6xW4n-89J4VRa86BwGnwoPE |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: update

### Method: PATCH

> ```
> http://localhost:3000/api/v1/reserved-team-name/22
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGV2ZWwiOiJMRVZFTDEiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYyMjc0MjEyLCJleHAiOjE4NzgyNzQyMTJ9.O33G3Zi4nNRwjLS9k7L_6xW4n-89J4VRa86BwGnwoPE |

### Body (**raw**)

```json
{
  "name": "رضا"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Collection: player face picture

## End-point: read

### Method: GET

> ```
> http://localhost:3000/api/v1/player-face-picture
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGV2ZWwiOiJMRVZFTDEiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYyMjc0MjEyLCJleHAiOjE4NzgyNzQyMTJ9.O33G3Zi4nNRwjLS9k7L_6xW4n-89J4VRa86BwGnwoPE |

### Query Params

| Param | value                                                                                                                                                                                 |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGV2ZWwiOiJMRVZFTDEiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYyMjc0MjEyLCJleHAiOjE4NzgyNzQyMTJ9.O33G3Zi4nNRwjLS9k7L_6xW4n-89J4VRa86BwGnwoPE |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: add

### Method: POST

> ```
> http://localhost:3000/api/v1/player-face-picture
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGV2ZWwiOiJMRVZFTDEiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYyMjc0MjEyLCJleHAiOjE4NzgyNzQyMTJ9.O33G3Zi4nNRwjLS9k7L_6xW4n-89J4VRa86BwGnwoPE |

### Body (**raw**)

```json
{
  "fileName": "20.jpeg",
  "fileSize": 10,
  "fileType": "jpeg",
  "isSpecial": false
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: delete

### Method: DELETE

> ```
> http://localhost:3000/api/v1/player-face-picture/46
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGV2ZWwiOiJMRVZFTDEiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYyMjc0MjEyLCJleHAiOjE4NzgyNzQyMTJ9.O33G3Zi4nNRwjLS9k7L_6xW4n-89J4VRa86BwGnwoPE |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: upload player face picture

### Method: POST

> ```
> https://s3.ir-thr-at1.arvanstorage.com/football-manager-player-face-picture
> ```

### Body formdata

| Param            | value                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Type |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| key              | 49ce73b7-2adc-46b2-9fa7-ce56d5c7c9dd_messi.jpeg                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | text |
| X-Amz-Algorithm  | AWS4-HMAC-SHA256                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | text |
| X-Amz-Credential | 27c2f3e2-5c70-4323-ae89-e13e04f839c4/20220910/default/s3/aws4_request                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | text |
| X-Amz-Date       | 20220910T192127Z                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | text |
| acl              | public-read                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | text |
| policy           | eyJleHBpcmF0aW9uIjoiMjAyMi0wOS0xMFQxOToyNToyN1oiLCJjb25kaXRpb25zIjpbeyJhY2wiOiJwdWJsaWMtcmVhZCJ9LHsiYnVja2V0IjoiZm9vdGJhbGwtbWFuYWdlci1wbGF5ZXItZmFjZS1waWN0dXJlIn0sWyJzdGFydHMtd2l0aCIsIiRrZXkiLCI0OWNlNzNiNy0yYWRjLTQ2YjItOWZhNy1jZTU2ZDVjN2M5ZGRfIl0sWyJjb250ZW50LWxlbmd0aC1yYW5nZSIsMCwxMjgwMDBdLHsiYWNsIjoicHVibGljLXJlYWQifSx7ImJ1Y2tldCI6ImZvb3RiYWxsLW1hbmFnZXItcGxheWVyLWZhY2UtcGljdHVyZSJ9LHsiWC1BbXotQWxnb3JpdGhtIjoiQVdTNC1ITUFDLVNIQTI1NiJ9LHsiWC1BbXotQ3JlZGVudGlhbCI6IjI3YzJmM2UyLTVjNzAtNDMyMy1hZTg5LWUxM2UwNGY4MzljNC8yMDIyMDkxMC9kZWZhdWx0L3MzL2F3czRfcmVxdWVzdCJ9LHsiWC1BbXotRGF0ZSI6IjIwMjIwOTEwVDE5MjEyN1oifSx7ImtleSI6IjQ5Y2U3M2I3LTJhZGMtNDZiMi05ZmE3LWNlNTZkNWM3YzlkZF9tZXNzaS5qcGVnIn1dfQ== | text |
| X-Amz-Signature  | e328c99bc25b8e44d78d92ee2a799ad73a28f19b0d61df9b526e9c836c8f2aed                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | text |
| file             | /home/developer/Pictures/player face picture/messi.jpeg                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | file |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Collection: composition

## End-point: read

### Method: GET

> ```
> http://localhost:3000/api/v1/composition
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGV2ZWwiOiJMRVZFTDEiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYyMjc0MjEyLCJleHAiOjE4NzgyNzQyMTJ9.O33G3Zi4nNRwjLS9k7L_6xW4n-89J4VRa86BwGnwoPE |

### Query Params

| Param | value                                                                                                                                                                                 |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGV2ZWwiOiJMRVZFTDEiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYyMjc0MjEyLCJleHAiOjE4NzgyNzQyMTJ9.O33G3Zi4nNRwjLS9k7L_6xW4n-89J4VRa86BwGnwoPE |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: add

### Method: POST

> ```
> http://localhost:3000/api/v1/composition
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGV2ZWwiOiJMRVZFTDEiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYyMjc0MjEyLCJleHAiOjE4NzgyNzQyMTJ9.O33G3Zi4nNRwjLS9k7L_6xW4n-89J4VRa86BwGnwoPE |

### Body (**raw**)

```json
{
  "GOALKEAPER_NO": true,
  "DEFENDER_LEFT": true,
  "DEFENDER_ONE": true,
  "DEFENDER_TWO": false,
  "DEFENDER_THREE": true,
  "DEFENDER_RIGHT": true,
  "MIDFIELDER_LEFT": false,
  "MIDFIELDER_ONE": true,
  "MIDFIELDER_TWO": true,
  "MIDFIELDER_THREE": true,
  "MIDFIELDER_RIGHT": false,
  "ATTACKER_LEFT": false,
  "ATTACKER_ONE": true,
  "ATTACKER_TWO": true,
  "ATTACKER_THREE": true,
  "ATTACKER_RIGHT": false,
  "score": 10
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: delete

### Method: DELETE

> ```
> http://localhost:3000/api/v1/composition/10
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGV2ZWwiOiJMRVZFTDEiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYyMjc0MjEyLCJleHAiOjE4NzgyNzQyMTJ9.O33G3Zi4nNRwjLS9k7L_6xW4n-89J4VRa86BwGnwoPE |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Collection: team

## End-point: create team

### Method: POST

> ```
> http://localhost:3000/api/v1/team
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibGV2ZWwiOiJMRVZFTDUiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYyODg4NzEyLCJleHAiOjE2NjI4OTIzMTJ9.tCXLdS_D9r-ldK4HHET_iw38jHgERMi3l3weoO6OUCc |

### Body (**raw**)

```json
{
  "name": "دوب اهن",
  "compositionId": 1,
  "technique": "ATTACK",
  "strategy": "LONG_PASS"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: get team

### Method: GET

> ```
> http://localhost:3000/api/v1/team/2
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibGV2ZWwiOiJMRVZFTDUiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYyOTA2MzYyLCJleHAiOjE2NjI5MDk5NjJ9.grxr-Vyd1mrl9ibybaU9VlhROp3D8SStMDaE6qx5Xvc |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: get players

### Method: GET

> ```
> http://localhost:3000/api/v1/team/2/players
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibGV2ZWwiOiJMRVZFTDUiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYzMDQ5NjU2LCJleHAiOjE2NjMxMzYwNTZ9.MRO9jZOSIgK4qEMi6JvKwiDjcHSrnaDl33ZX-I05mSw |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: change composition

### Method: PATCH

> ```
> http://localhost:3000/api/v1/team/composition
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGV2ZWwiOiJMRVZFTDEiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYyOTA3NjEzLCJleHAiOjE2NjI5MTEyMTN9.nDA6XbMcpHRxhddX7yNCzc7JCp5Tc-WgjRcLxLcGr-0 |

### Body (**raw**)

```json
{
  "compositionId": 2,
  "teamId": 2
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: change position in composition

### Method: PATCH

> ```
> http://localhost:3000/api/v1/team/change-two-player-position
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibGV2ZWwiOiJMRVZFTDUiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYyOTE0NTU2LCJleHAiOjE2NjI5MTgxNTZ9.7dKddfkPkkvJqp5LNPq-dfETwy06yQPjZ0QvUcQMZgQ |

### Body (**raw**)

```json
{
  "playerOneId": 21,
  "playerTwoId": 22,
  "teamId": 2
}
```

### Query Params

| Param | value                                                                                                                                                                                 |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGV2ZWwiOiJMRVZFTDEiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYyODg5MDgyLCJleHAiOjE2NjI4OTI2ODJ9.bogX_8XXEbarDi-pjLJJx0VQp0dX0BW7ts6sH2yo48U |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Collection: request to create player

## End-point: request to create player

### Method: POST

> ```
> http://localhost:3000/api/v1/request-to-create-player
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibGV2ZWwiOiJMRVZFTDUiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYyNDAwOTIyLCJleHAiOjE4Nzg0MDA5MjJ9.7MbhBFfux_WgyJHzZB4GIcF9RLvnLNWENyG5CrhAQcQ |

### Body (**raw**)

```json
{
  "teamId": 14,
  "name": "لیونل مسی",
  "fileSize": 3,
  "fileType": "jpeg",
  "fileName": "messi.jpeg",
  "positionId": 22,
  "spead": 300,
  "controll": 300,
  "pass": 300,
  "flexibility": 300,
  "stamina": 300,
  "technique": 300,
  "shoot": 300,
  "drible": 300,
  "focus": 300,
  "experience": 300,
  "nationality": "ارژانتین",
  "age": 16
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: confirm request

### Method: PATCH

> ```
> http://localhost:3000/api/v1/request-to-create-player/confirm
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGV2ZWwiOiJMRVZFTDEiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYyODM3Nzg4LCJleHAiOjE2NjI4NDEzODh9.SHfmQ1gmRXj-zI8vHFGx2XOAkN_DinXhdHYjAmBZBPc |

### Body (**raw**)

```json
{
  "requestId": 9,
  "adminResponse": "بازیکن شما ساخته شد و شما می توانید انرا از ماکرت خریداری کنید"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: reject request

### Method: PATCH

> ```
> http://localhost:3000/api/v1/request-to-create-player/reject
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibGV2ZWwiOiJMRVZFTDUiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYyNDAwOTIyLCJleHAiOjE4Nzg0MDA5MjJ9.7MbhBFfux_WgyJHzZB4GIcF9RLvnLNWENyG5CrhAQcQ |

### Body (**raw**)

```json
{
  "requestId": 2,
  "adminResponse": "بازیکن شما ساخته شد و شما می توانید انرا از ماکرت خریداری کنید",
  "reason": "REJECT"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: delete request

### Method: DELETE

> ```
> http://localhost:3000/api/v1/request-to-create-player/9
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibGV2ZWwiOiJMRVZFTDUiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYyNDAwOTIyLCJleHAiOjE4Nzg0MDA5MjJ9.7MbhBFfux_WgyJHzZB4GIcF9RLvnLNWENyG5CrhAQcQ |

### Body (**raw**)

```json
{
  "teamId": 14
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: reactive request

### Method: PATCH

> ```
> http://localhost:3000/api/v1/request-to-create-player/reactive
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibGV2ZWwiOiJMRVZFTDUiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYyNDAwOTIyLCJleHAiOjE4Nzg0MDA5MjJ9.7MbhBFfux_WgyJHzZB4GIcF9RLvnLNWENyG5CrhAQcQ |

### Body (**raw**)

```json
{
  "requestId": 2
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: get request to create player

### Method: GET

> ```
> http://localhost:3000/api/v1/request-to-create-player
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGV2ZWwiOiJMRVZFTDEiLCJpc0Jsb2NrIjp0cnVlLCJpYXQiOjE2NjI4Mzg4NTMsImV4cCI6MTY2Mjg0MjQ1M30.laREJB1P6W8p7B1zFOPhXa5aCXss3eKPVbhz7bXFYG0 |

### Body (**raw**)

```json

```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Collection: player

## End-point: create plaer by admin

### Method: POST

> ```
> http://localhost:3000/api/v1/player
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGV2ZWwiOiJMRVZFTDEiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYyODQxNDE2LCJleHAiOjE2NjI4NDUwMTZ9.CkJZNNftxroo0iKuaM3q9i6udWHDseIXIPg55mFpoRE |

### Body (**raw**)

```json
{
  "name": "رضا اتحادی",
  "fileSize": 10,
  "fileType": "jpeg",
  "fileName": "reza.jpeg",
  "age": 16,
  "positionId": 10,
  "nationality": "japan",
  "spead": 250,
  "controll": 300,
  "pass": 300,
  "flexibility": 250,
  "stamina": 200,
  "technique": 100,
  "shoot": 300,
  "drible": 250,
  "focus": 300,
  "experience": 300,
  "price": 1200
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: change tshirt number

### Method: PATCH

> ```
> http://localhost:3000/api/v1/player/tshirt-number
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibGV2ZWwiOiJMRVZFTDUiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYyODkyODg0LCJleHAiOjE2NjI4OTY0ODR9.gg3ZzSKJf9RdBbgBE4ptKNrnryZ_Ce78ZwVYZHNNbAA |

### Body (**raw**)

```json
{
  "teamId": 2,
  "playerId": 23,
  "tShirtNumber": 10
}
```

### Query Params

| Param | value                                                                                                                                                                                 |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGV2ZWwiOiJMRVZFTDEiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYyODg5MDgyLCJleHAiOjE2NjI4OTI2ODJ9.bogX_8XXEbarDi-pjLJJx0VQp0dX0BW7ts6sH2yo48U |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Collection: user

## End-point: get user info

### Method: GET

> ```
> http://localhost:3000/api/v1/user
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibGV2ZWwiOiJMRVZFTDUiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYyOTkwNzI4LCJleHAiOjE2NjI5OTQzMjh9.3xxoom2P4S0h4Ei-MUKcFYiXMVtzFF9TueNNqW9GPJg |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: block user

### Method: PATCH

> ```
> http://localhost:3000/api/v1/user/block
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGV2ZWwiOiJMRVZFTDEiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYyOTI1MTA2LCJleHAiOjE2NjI5Mjg3MDZ9.BFEgCh-DMNi3-W2mAhcI2PcfbAVMPB8bs6QittLGFWo |

### Body (**raw**)

```json
{
  "userId": 4
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: unblock user

### Method: PATCH

> ```
> http://localhost:3000/api/v1/user/un-block
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGV2ZWwiOiJMRVZFTDEiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYyOTcxMDAxLCJleHAiOjE2NjI5NzQ2MDF9.eziTxsa4pzjTitZc1SNFB3HQH5ukfdnAVWkQvioCKz4 |

### Body (**raw**)

```json
{
  "userId": 4
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: completionInformation

### Method: POST

> ```
> http://localhost:3000/api/v1/user/completion-information
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accesstoken  | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTQsInJvbGUiOiJOb3JtYWwiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjcyODM5NjcxLCJleHAiOjE2NzI5MjYwNzF9.eFn8fX1SE5L5rOCtkPF8vFKiOH9zKsdY3xZVVRtFg0I |

### Body (**raw**)

```json
{
  "gender": "Male",
  "birthday": "141325205000",
  "country": "ایران",
  "state": "خراسان رضوی",
  "city": "مشهد",
  "bio": "سلام",
  "fileSize": "125",
  "fileType": "jpeg"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Collection: coin plan

## End-point: buy coin

### Method: POST

> ```
> http://localhost:3000/api/v1/coin-plan
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGV2ZWwiOiJMRVZFTDEiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYyOTcxMTIyLCJleHAiOjE2NjI5NzQ3MjJ9.6d76_EoXTU7rjLYNawIFxD9ajCBiQf0ykxLYd2EBXoE |

### Body (**raw**)

```json
{
  "amount": 100,
  "price": 100,
  "discountInPercent": "50"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: create coin plan Copy

### Method: POST

> ```
> http://localhost:3000/api/v1/coin-plan
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGV2ZWwiOiJMRVZFTDEiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYyOTcxMTIyLCJleHAiOjE2NjI5NzQ3MjJ9.6d76_EoXTU7rjLYNawIFxD9ajCBiQf0ykxLYd2EBXoE |

### Body (**raw**)

```json
{
  "amount": 100,
  "price": 100,
  "discountInPercent": "50"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: read coin plan

### Method: GET

> ```
> http://localhost:3000/api/v1/coin-plan
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGV2ZWwiOiJMRVZFTDEiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYyOTcxMTIyLCJleHAiOjE2NjI5NzQ3MjJ9.6d76_EoXTU7rjLYNawIFxD9ajCBiQf0ykxLYd2EBXoE |

### Body (**raw**)

```json
{
  "amount": 100,
  "price": 100,
  "discountInPercent": "60"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: delete coin plan

### Method: DELETE

> ```
> http://localhost:3000/api/v1/coin-plan/5
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGV2ZWwiOiJMRVZFTDEiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYyOTcxMTIyLCJleHAiOjE2NjI5NzQ3MjJ9.6d76_EoXTU7rjLYNawIFxD9ajCBiQf0ykxLYd2EBXoE |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Collection: gym

## End-point: create gym

### Method: POST

> ```
> http://localhost:3000/api/v1/gym
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGV2ZWwiOiJMRVZFTDEiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYzMDQ5Njk0LCJleHAiOjE2NjMxMzYwOTR9.UhtRmuDk05WoKusU55_gdWorElpGMoWnoWE_iRhgfrs |

### Body (**raw**)

```json
{
  "level": 3,
  "price": 15,
  "capacity": 15
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: read gym

### Method: GET

> ```
> http://localhost:3000/api/v1/gym?id=2
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibGV2ZWwiOiJMRVZFTDUiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYzMDQ5NjU2LCJleHAiOjE2NjMxMzYwNTZ9.MRO9jZOSIgK4qEMi6JvKwiDjcHSrnaDl33ZX-I05mSw |

### Body (**raw**)

```json

```

### Query Params

| Param | value |
| ----- | ----- |
| id    | 2     |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: delete gym

### Method: DELETE

> ```
> http://localhost:3000/api/v1/gym/6
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGV2ZWwiOiJMRVZFTDEiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYyOTkzOTE4LCJleHAiOjE2NjI5OTc1MTh9.s2s-z2u_HryOfWkbxx_MnCCOyBgPnhGWReiiOosWkOw |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: buy gym

### Method: POST

> ```
> http://localhost:3000/api/v1/gym/buy
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibGV2ZWwiOiJMRVZFTDUiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYzMDQ5NjU2LCJleHAiOjE2NjMxMzYwNTZ9.MRO9jZOSIgK4qEMi6JvKwiDjcHSrnaDl33ZX-I05mSw |

### Body (**raw**)

```json
{
  "gymId": 9,
  "teamId": 2
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: use gym

### Method: POST

> ```
> http://localhost:3000/api/v1/gym/use
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibGV2ZWwiOiJMRVZFTDUiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYzMDQ5NjU2LCJleHAiOjE2NjMxMzYwNTZ9.MRO9jZOSIgK4qEMi6JvKwiDjcHSrnaDl33ZX-I05mSw |

### Body (**raw**)

```json
{
  "playerId": 25,
  "teamId": 2,
  "power": "spead"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Collection: coach

## End-point: create coach

### Method: POST

> ```
> http://localhost:3000/api/v1/coach
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGV2ZWwiOiJMRVZFTDEiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYzMDQ5Njk0LCJleHAiOjE2NjMxMzYwOTR9.UhtRmuDk05WoKusU55_gdWorElpGMoWnoWE_iRhgfrs |

### Body (**raw**)

```json
{
  "level": 3,
  "price": 15,
  "ability": 15
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: read coach

### Method: GET

> ```
> http://localhost:3000/api/v1/coach?id=2
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibGV2ZWwiOiJMRVZFTDUiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYzMDQ5NjU2LCJleHAiOjE2NjMxMzYwNTZ9.MRO9jZOSIgK4qEMi6JvKwiDjcHSrnaDl33ZX-I05mSw |

### Body (**raw**)

```json

```

### Query Params

| Param | value |
| ----- | ----- |
| id    | 2     |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: delete coach

### Method: DELETE

> ```
> http://localhost:3000/api/v1/coach/8
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGV2ZWwiOiJMRVZFTDEiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYzMDQ5Njk0LCJleHAiOjE2NjMxMzYwOTR9.UhtRmuDk05WoKusU55_gdWorElpGMoWnoWE_iRhgfrs |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: buy coach

### Method: POST

> ```
> http://localhost:3000/api/v1/coach/buy
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibGV2ZWwiOiJMRVZFTDUiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYzMDQ5NjU2LCJleHAiOjE2NjMxMzYwNTZ9.MRO9jZOSIgK4qEMi6JvKwiDjcHSrnaDl33ZX-I05mSw |

### Body (**raw**)

```json
{
  "coachId": 9,
  "teamId": 2
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Collection: doctor

## End-point: create doctor

### Method: POST

> ```
> http://localhost:3000/api/v1/doctor
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGV2ZWwiOiJMRVZFTDEiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYzMDQ5Njk0LCJleHAiOjE2NjMxMzYwOTR9.UhtRmuDk05WoKusU55_gdWorElpGMoWnoWE_iRhgfrs |

### Body (**raw**)

```json
{
  "level": 3,
  "price": 15,
  "ability": 15
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: read doctor

### Method: GET

> ```
> http://localhost:3000/api/v1/doctor?id=2
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibGV2ZWwiOiJMRVZFTDUiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYzMDQ5NjU2LCJleHAiOjE2NjMxMzYwNTZ9.MRO9jZOSIgK4qEMi6JvKwiDjcHSrnaDl33ZX-I05mSw |

### Body (**raw**)

```json

```

### Query Params

| Param | value |
| ----- | ----- |
| id    | 2     |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: delete doctor

### Method: DELETE

> ```
> http://localhost:3000/api/v1/doctor/3
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGV2ZWwiOiJMRVZFTDEiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYzMDQ5Njk0LCJleHAiOjE2NjMxMzYwOTR9.UhtRmuDk05WoKusU55_gdWorElpGMoWnoWE_iRhgfrs |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: buy doctor

### Method: POST

> ```
> http://localhost:3000/api/v1/doctor/buy
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibGV2ZWwiOiJMRVZFTDUiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYzMDQ5NjU2LCJleHAiOjE2NjMxMzYwNTZ9.MRO9jZOSIgK4qEMi6JvKwiDjcHSrnaDl33ZX-I05mSw |

### Body (**raw**)

```json
{
  "doctorId": 3,
  "teamId": 2
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: use gym Copy

### Method: POST

> ```
> http://localhost:3000/api/v1/doctor/use
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibGV2ZWwiOiJMRVZFTDUiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYzMDQ5NjU2LCJleHAiOjE2NjMxMzYwNTZ9.MRO9jZOSIgK4qEMi6JvKwiDjcHSrnaDl33ZX-I05mSw |

### Body (**raw**)

```json
{
  "teamId": 2
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Collection: energy producer

## End-point: create doctor

### Method: POST

> ```
> http://localhost:3000/api/v1/coach
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGV2ZWwiOiJMRVZFTDEiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYzMDQ5Njk0LCJleHAiOjE2NjMxMzYwOTR9.UhtRmuDk05WoKusU55_gdWorElpGMoWnoWE_iRhgfrs |

### Body (**raw**)

```json
{
  "level": 3,
  "price": 15,
  "ability": 15
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: read doctor

### Method: GET

> ```
> http://localhost:3000/api/v1/doctor?id=2
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibGV2ZWwiOiJMRVZFTDUiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYzMDQ5NjU2LCJleHAiOjE2NjMxMzYwNTZ9.MRO9jZOSIgK4qEMi6JvKwiDjcHSrnaDl33ZX-I05mSw |

### Body (**raw**)

```json

```

### Query Params

| Param | value |
| ----- | ----- |
| id    | 2     |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: delete doctor

### Method: DELETE

> ```
> http://localhost:3000/api/v1/coach/8
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGV2ZWwiOiJMRVZFTDEiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYzMDQ5Njk0LCJleHAiOjE2NjMxMzYwOTR9.UhtRmuDk05WoKusU55_gdWorElpGMoWnoWE_iRhgfrs |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: buy doctor

### Method: POST

> ```
> http://localhost:3000/api/v1/coach/buy
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibGV2ZWwiOiJMRVZFTDUiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYzMDQ5NjU2LCJleHAiOjE2NjMxMzYwNTZ9.MRO9jZOSIgK4qEMi6JvKwiDjcHSrnaDl33ZX-I05mSw |

### Body (**raw**)

```json
{
  "coachId": 9,
  "teamId": 2
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: use gym Copy

### Method: POST

> ```
> http://localhost:3000/api/v1/gym/use
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibGV2ZWwiOiJMRVZFTDUiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYzMDQ5NjU2LCJleHAiOjE2NjMxMzYwNTZ9.MRO9jZOSIgK4qEMi6JvKwiDjcHSrnaDl33ZX-I05mSw |

### Body (**raw**)

```json
{
  "playerId": 25,
  "teamId": 2,
  "power": "spead"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Collection: psychologist

## End-point: create doctor

### Method: POST

> ```
> http://localhost:3000/api/v1/coach
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGV2ZWwiOiJMRVZFTDEiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYzMDQ5Njk0LCJleHAiOjE2NjMxMzYwOTR9.UhtRmuDk05WoKusU55_gdWorElpGMoWnoWE_iRhgfrs |

### Body (**raw**)

```json
{
  "level": 3,
  "price": 15,
  "ability": 15
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: read doctor

### Method: GET

> ```
> http://localhost:3000/api/v1/doctor?id=2
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibGV2ZWwiOiJMRVZFTDUiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYzMDQ5NjU2LCJleHAiOjE2NjMxMzYwNTZ9.MRO9jZOSIgK4qEMi6JvKwiDjcHSrnaDl33ZX-I05mSw |

### Body (**raw**)

```json

```

### Query Params

| Param | value |
| ----- | ----- |
| id    | 2     |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: delete doctor

### Method: DELETE

> ```
> http://localhost:3000/api/v1/coach/8
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGV2ZWwiOiJMRVZFTDEiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYzMDQ5Njk0LCJleHAiOjE2NjMxMzYwOTR9.UhtRmuDk05WoKusU55_gdWorElpGMoWnoWE_iRhgfrs |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: buy doctor

### Method: POST

> ```
> http://localhost:3000/api/v1/coach/buy
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibGV2ZWwiOiJMRVZFTDUiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYzMDQ5NjU2LCJleHAiOjE2NjMxMzYwNTZ9.MRO9jZOSIgK4qEMi6JvKwiDjcHSrnaDl33ZX-I05mSw |

### Body (**raw**)

```json
{
  "coachId": 9,
  "teamId": 2
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: use gym Copy

### Method: POST

> ```
> http://localhost:3000/api/v1/gym/use
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibGV2ZWwiOiJMRVZFTDUiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjYzMDQ5NjU2LCJleHAiOjE2NjMxMzYwNTZ9.MRO9jZOSIgK4qEMi6JvKwiDjcHSrnaDl33ZX-I05mSw |

### Body (**raw**)

```json
{
  "playerId": 25,
  "teamId": 2,
  "power": "spead"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Collection: captcha

## End-point: New Request

### Method: GET

> ```
> http://localhost:3000/api/v1/captcha
> ```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Collection: friendlyGame

## End-point: create request

### Method: POST

> ```
> http://localhost:3000/api/v1/friendly-game?accesstoken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTQsInJvbGUiOiJOb3JtYWwiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjcyNTk4MTQ0LCJleHAiOjE2NzI2ODQ1NDR9.ruvDa_88UanMS3xE_-3Bn4wsSL2NL7FWfWKGUsLRR-8
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accesstoken  | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTQsInJvbGUiOiJOb3JtYWwiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjcyNTk4MTQ0LCJleHAiOjE2NzI2ODQ1NDR9.ruvDa*88UanMS3xE*-3Bn4wsSL2NL7FWfWKGUsLRR-8 |

### Body (**raw**)

```json
{
  "teamId": "53",
  "receiverTeamId": "56"
}
```

### Query Params

| Param       | value                                                                                                                                                                                 |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accesstoken | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTQsInJvbGUiOiJOb3JtYWwiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjcyNTk4MTQ0LCJleHAiOjE2NzI2ODQ1NDR9.ruvDa*88UanMS3xE*-3Bn4wsSL2NL7FWfWKGUsLRR-8 |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Collection: group

## End-point: create group

### Method: POST

> ```
> http://localhost:3000/api/v1/group
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accesstoken  | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTQsInJvbGUiOiJOb3JtYWwiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjcyOTM0ODg4LCJleHAiOjE2NzMwMjEyODh9.4la4gVuOWkNaCCzZZ5fq1UBKngCYiH3bOxaH3lIA17Y |

### Body (**raw**)

```json
{
  "teamId": "53",
  "name": "new2",
  "bio": "welcome to my group",
  "accessType": "Private"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: add deputy

### Method: POST

> ```
> http://localhost:3000/api/v1/group/deputy
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accesstoken  | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTQsInJvbGUiOiJOb3JtYWwiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjczNTI0NzYzLCJleHAiOjE2NzM2MTExNjN9.XCMttfBgyd19txvbPN4Q4GST_Z5HRhBW_DLND9OrEGY |

### Body (**raw**)

```json
{
  "teamId": "53",
  "groupId": "1",
  "deputyId": "54"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: dismissal deputy

### Method: POST

> ```
> http://localhost:3000/api/v1/group/dismissal-deputy/54
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accesstoken  | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTQsInJvbGUiOiJOb3JtYWwiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjczNTI0NzYzLCJleHAiOjE2NzM2MTExNjN9.XCMttfBgyd19txvbPN4Q4GST_Z5HRhBW_DLND9OrEGY |

### Body (**raw**)

```json
{
  "teamId": "53",
  "groupId": "1"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: block member

### Method: POST

> ```
> http://localhost:3000/api/v1/group/block/54
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accesstoken  | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTQsInJvbGUiOiJOb3JtYWwiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjczNTI0NzYzLCJleHAiOjE2NzM2MTExNjN9.XCMttfBgyd19txvbPN4Q4GST_Z5HRhBW_DLND9OrEGY |

### Body (**raw**)

```json
{
  "teamId": "53",
  "groupId": "1"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: get all groups

### Method: GET

> ```
> http://localhost:3000/api/v1/group/search?key=ne
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accesstoken  | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTQsInJvbGUiOiJOb3JtYWwiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjczNTMzOTkxLCJleHAiOjE2NzM2MjAzOTF9.fS10rRIY6Urb4N4zggBnRP0bXfmmZ4We8fTGQtXPmrs |

### Body (**raw**)

```json
{
  "teamId": "53",
  "groupId": "1",
  "deputyId": "54"
}
```

### Query Params

| Param | value |
| ----- | ----- |
| key   | ne    |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: join to the group

### Method: POST

> ```
> http://localhost:3000/api/v1/group/join/1
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accesstoken  | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTUsInJvbGUiOiJOb3JtYWwiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjczNTM0MTEzLCJleHAiOjE2NzM2MjA1MTN9.pNEpqiWburrwFXcFRLKery419ojXJ-aFixHqUaDVUqE |

### Body (**raw**)

```json
{
  "teamId": "54"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: left to the group

### Method: POST

> ```
> http://localhost:3000/api/v1/group/left/1
> ```

### Headers

| Content-Type | Value                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accesstoken  | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTQsInJvbGUiOiJOb3JtYWwiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjczNTI0NzYzLCJleHAiOjE2NzM2MTExNjN9.XCMttfBgyd19txvbPN4Q4GST_Z5HRhBW_DLND9OrEGY |

### Body (**raw**)

```json
{
  "teamId": "53"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

---

Powered By: [postman-to-markdown](https://github.com/bautistaj/postman-to-markdown/)
