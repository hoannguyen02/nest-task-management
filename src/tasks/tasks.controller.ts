import { CreateTaskDto } from './dto/create-task.dto';
import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { SearchTaskDto } from './dto/search-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { GetUser } from 'src/auth/get-user.decorator';
import { Task } from './tasks.entity';
import { TaskStatus } from './tasks.enum';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private tasksService: TasksService) {

    }

    @Get()
    getTasks(
        @Query() searchTask: SearchTaskDto,
        @GetUser() user: User,
        ): Promise<Task[]> {
        return this.tasksService.getTasks(searchTask, user);
    }

    @Get('/:id')
    getTaskById(
        @Param('id') id: string,
        @GetUser() user: User,
    ): Promise<Task> {
        return this.tasksService.getTaskById(id, user);
    }

    @Delete('/:id')
    deleteTask(
        @Param('id') id: string,
        @GetUser() user: User,
    ): Promise<void> {
        return this.tasksService.deleteTask(id, user);
    }

    @Patch('/:id/status')
    updateStatus(
        @Param('id') id: string,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus,
        @GetUser() user: User,
        ): Promise<Task> {
        return this.tasksService.updateStatus(id, status, user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user: User,
        ): Promise<Task> {
        return this.tasksService.createTask(createTaskDto, user);
    }
}
