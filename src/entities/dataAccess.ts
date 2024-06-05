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
  
  @Entity( { name: "DataAccess"} )
  export class DataAccess {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => RoleHierarchy, rh => rh.id)
    @JoinColumn({name: "RoleId"})
    RoleId: RoleHierarchy;
  
    @Column({ default: null, type: 'nvarchar', length: 100})
    District: string;
  
    @Column({ default: null, type: 'nvarchar', length: 100})
    TalukorZone: string;
  
    @Column({ default: null, type: 'nvarchar', length: 100})
    GpOrPhc: string;
  
    @Column({ default: null, type: 'nvarchar', length: 100})
    VllageOrWard: Date;
  
    @Column({ default: null, type: 'nvarchar', length: 100})
    TypeOfData: Date;

    @CreateDateColumn()
    CreatedDate: Date;

    @UpdateDateColumn()
    UpdatedDate: Date;
  }
  