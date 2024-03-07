package main

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

	err := GetDb().Create(&Todo).Error

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

func UpdateTodo(c *gin.Context) {
	todoID := c.Param("id")

	if todoID == "" {
		c.JSON(400, gin.H{
			"message": "Todo ID is required",
		})
		return
	}

	var updatedTodo ToDo
	if err := c.ShouldBindJSON(&updatedTodo); err != nil {
		c.JSON(400, gin.H{
			"message": "Invalid todo data",
		})
		return
	}

	var todo ToDo
	result := GetDb().First(&todo, todoID)
	if result.Error != nil {
		c.JSON(404, gin.H{
			"message": "Todo not found",
		})
		return
	}

	todo.Title = updatedTodo.Title
	todo.Completed = updatedTodo.Completed
	GetDb().Save(&todo)

	c.JSON(200, todo)
}

func DeleteTodo(c *gin.Context) {
	todoID := c.Param("id")

	if todoID == "" {
		c.JSON(400, gin.H{
			"message": "Todo ID is required",
		})
		return
	}

	var todo ToDo
	result := GetDb().First(&todo, todoID)
	if result.Error != nil {
		c.JSON(404, gin.H{
			"message": "Todo not found",
		})
		return
	}

	GetDb().Delete(&todo)

	c.JSON(200, gin.H{
		"message": "Todo deleted successfully",
	})
}

func ListTodos(c *gin.Context) {
	var todos []ToDo
	result := GetDb().Find(&todos)
	if result.Error != nil {
		c.JSON(500, gin.H{
			"message": "Failed to retrieve todos",
		})
		return
	}

	c.JSON(200, todos)
}

func MarkTodoAsCompleted(c *gin.Context) {
	todoID := c.Param("id")

	if todoID == "" {
		c.JSON(400, gin.H{
			"message": "Todo ID is required",
		})
		return
	}

	var todo ToDo
	result := GetDb().First(&todo, todoID)
	if result.Error != nil {
		c.JSON(404, gin.H{
			"message": "Todo not found",
		})
		return
	}

	todo.Completed = true
	GetDb().Save(&todo)

	c.JSON(200, todo)
}

func MarkTodoAsIncomplete(c *gin.Context) {
	todoID := c.Param("id")

	if todoID == "" {
		c.JSON(400, gin.H{
			"message": "Todo ID is required",
		})
		return
	}

	var todo ToDo
	result := GetDb().First(&todo, todoID)
	if result.Error != nil {
		c.JSON(404, gin.H{
			"message": "Todo not found",
		})
		return
	}

	todo.Completed = false
	GetDb().Save(&todo)

	c.JSON(200, todo)
}

func ListCompletedTodos(c *gin.Context) {
	var todos []ToDo
	result := GetDb().Where("completed = ?", true).Find(&todos)
	if result.Error != nil {
		c.JSON(500, gin.H{
			"message": "Failed to retrieve completed todos",
		})
		return
	}

	c.JSON(200, todos)
}

func ListNotCompletedTodos(c *gin.Context) {
	var todos []ToDo
	result := GetDb().Where("completed = ?", false).Find(&todos)
	if result.Error != nil {
		c.JSON(500, gin.H{
			"message": "Failed to retrieve not completed todos",
		})
		return
	}

	c.JSON(200, todos)
}

func ListTodosByTitle(c *gin.Context) {
	title := c.Query("title")

	if title == "" {
		c.JSON(400, gin.H{
			"message": "Title parameter is required",
		})
		return
	}

	var todos []ToDo
	result := GetDb().Where("title = ?", title).Find(&todos)
	if result.Error != nil {
		c.JSON(500, gin.H{
			"message": "Failed to retrieve todos with specified title",
		})
		return
	}

	c.JSON(200, todos)
}