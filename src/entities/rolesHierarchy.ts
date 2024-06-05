import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn
  } from "typeorm";
  
  @Entity( { name: "RoleHierarchy"} )
  export class RoleHierarchy {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ default: null, type: 'text'})
    Role: string;
  
    @Column({ default: null, type: 'int'})
    ParentId: number;
  
    @CreateDateColumn()
    createdDate: Date;
  }
  