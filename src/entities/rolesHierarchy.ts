import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany
  } from "typeorm";
import { Roles } from "./roles";
import { AssigningMasters } from "./assigningMasters";
import { UserData } from "./userData";
import { DataAccess } from "./dataAccess";
  
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

    @OneToMany(() => Roles, rs => rs.RoleId)
    rh: Roles[]

    @OneToMany(() => Roles, rs => rs.RoleId)
    Roles: Roles[]

    @OneToMany(() => AssigningMasters, rs => rs.RoleId)
    AssigningMaster: AssigningMasters[]

    @OneToMany(() => UserData, rs => rs.RoleId)
    UserData: UserData[]

    @OneToMany(() => DataAccess, rs => rs.RoleId)
    DataAccess: DataAccess[]
  }
  