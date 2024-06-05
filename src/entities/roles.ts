import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
  } from "typeorm";
import { RoleHierarchy } from "./rolesHierarchy";
  
  @Entity( { name: "Roles"} )
  export class Roles {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => RoleHierarchy, rh => rh.id)
    @JoinColumn({name: "RoleId"})
    RoleId: RoleHierarchy;
  
    @Column({ default: null, type: 'nvarchar', length: 100})
    Child: string;
  
    @Column({ default: null, type: 'nvarchar', length: 100})
    IsLastStage: string;
  
    @CreateDateColumn()
    CreatedDate: Date;

    @UpdateDateColumn()
    UpdatedDate: Date;
  }
  