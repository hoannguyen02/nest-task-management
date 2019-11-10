import { Repository, EntityRepository } from 'typeorm';
import { Task } from './tasks.entity';
import * as uuid from 'uuid/v1';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './tasks.enum';
import { SearchTaskDto } from './dto/search-task.dto';
import { User } from '../auth/user.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async getTasks(searchTask: SearchTaskDto, user: User): Promise<Task[]> {
        const { status, search} = searchTask;
        const query = this.createQueryBuilder('task');
        query.where('task.userId = :userId', { userId: user.id});
        if (status) {
            query.andWhere('task.status = :status', { status});
        }

        if (search) {
            query.andWhere('task.description LIKE :search or task.title LIKE :search', { search: `%${search}%`});
        }
        const tasks = await query.getMany();
        return tasks;
    }

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const { title, description } = createTaskDto;
        const task = new Task();
        task.id = uuid();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        task.user = user;
        await task.save();

        delete task.user;
        return task;

    }
}
