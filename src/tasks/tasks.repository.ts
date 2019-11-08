import { Repository, EntityRepository } from 'typeorm';
import { Task } from './tasks.entity';
import * as uuid from 'uuid/v1';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './tasks.enum';
import { SearchTaskDto } from './dto/search-task.dto';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async getTasks(searchTask: SearchTaskDto): Promise<Task[]> {
        const { status, search} = searchTask;
        const query = this.createQueryBuilder('task');
        if (status) {
            query.andWhere('task.status = :status', { status});
        }

        if (search) {
            query.andWhere('task.description LIKE :search or task.title LIKE :search', { search: `%${search}%`});
        }
        const tasks = await query.getMany();
        return tasks;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;
        const task = new Task();
        task.id = uuid();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        await task.save();
        return task;

    }
}
