import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn
} from "typeorm";


@Entity({ name: "AdminData" })
export class AdminData {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: null, type: 'nvarchar', length: "40" })
    Role: string;

    @Column({ default: null, type: 'nvarchar', length: "40" })
    Name: string;

    @Column({ default: null, type: 'nvarchar', length: "12" })
    Mobile: string;

    @CreateDateColumn()
    createdDate: Date;

    @CreateDateColumn()
    UpdatedDate: Date;
};
