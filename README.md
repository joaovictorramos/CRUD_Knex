# Student

## Endpoints

### (POST) /student
```
    {
      "name": "João Ramos",
      "registration": 200
    }
```

### (GET) /student
- Find all students

### (GET) /student/:id
- Path variable: **id**

### (DELETE) /student/:id
- Path variable: **id**

### (PUT) /student/:id
- Path variable: **id**

### (PATCH) /student/:id
- Path variable: **registration**

### (POST) /student/create
- Insertion of student with course
```
    {
      "name": "Cleito Junior",
      "registration": 201,
      "courses": [2]
    }
```  

# Course

## Endpoints

### (POST) /course
```
    {
      "name": "Contabilidade",
      "description": "Curso de contabilidade"
    }
```

### (GET) /course
- Find all courses

### (GET) /course/:id
- Path variable: **id**
 
### (DELETE) /course/:id
- Path variable: **id**

### (PUT) /course/:id
- Path variable: **id**

### (PATCH) /course/:id
- Path variable: **id**

### (POST) /course
- Insertion of course with student
```
    {
      "name": "Sistemas da Informação",
      "description": "Curso de SI",
      "students": [1]
    }
```

#### OBS:
```
    If you need to link a student to a course or vice versa, try using the PUT or PATCH methods :)
```