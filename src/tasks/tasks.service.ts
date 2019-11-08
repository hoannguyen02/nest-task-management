import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { SearchTaskDto } from './dto/search-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './tasks.repository';
import { Task } from './tasks.entity';
import { TaskStatus } from './tasks.enum';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
    ) {

    }

    async getTasks(searchTask: SearchTaskDto): Promise<Task[]> {
        return await this.taskRepository.getTasks(searchTask);
    }

    async getTaskById(id: string): Promise<Task> {
        const task = await this.taskRepository.findOne(id);
        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        return task;
    }

    async deleteTask(id: string): Promise<void> {
        const result = await this.taskRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
    }

    async updateStatus(id: string, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = status;
        await task.save();
        return task;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto);
    }
}
