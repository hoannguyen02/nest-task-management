import { CreateTaskDto } from './dto/create-task.dto';
import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { SearchTaskDto } from './dto/search-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './tasks.entity';
import { TaskStatus } from './tasks.enum';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {

    }

    @Get()
    getTasks(@Query() searchTask: SearchTaskDto): Promise<Task[]> {
        return this.tasksService.getTasks(searchTask);
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): Promise<void> {
        return this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateStatus(@Param('id') id: string, @Body('status', TaskStatusValidationPipe) status: TaskStatus): Promise<Task> {
        return this.tasksService.updateStatus(id, status);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksService.createTask(createTaskDto);
    }
}
