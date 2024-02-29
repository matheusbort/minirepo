package main

import "C"
import "github.com/gin-gonic/gin"

func HelloWorld(c *gin.Context) {
	name := c.Query("name")

	if name == "" {
		c.JSON(400, gin.H{
			"message": "Name is required",
		})
		return

	}

	c.JSON(200, gin.H{
		"message": "Hello " + name,
	})
}

func Create(c *gin.Context) {
	title := c.Query("title")

	Todo := ToDo{Title: title, Completed: false}

	err := GetDb().Create(&Todo)

	if err != nil {
		c.JSON(400, gin.H{
			"message": "Error creating todo",
		})
		return
	}

	c.JSON(200, gin.H{
		"message": "Todo created",
	})
}

// Exercicio

// Create method to list all todos
// Create method to create a todo
// Create method to update a todo
// Create method to delete a todo
// Create method to mark a todo as completed
// Create method to mark a todo as not completed
// Create method to list all completed todos
// Create method to list all not completed todos
// Create method to list all todos with a specific title
