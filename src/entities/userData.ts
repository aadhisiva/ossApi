import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert,
    ManyToOne,
    JoinColumn
  } from "typeorm";
import { RoleHierarchy } from "./rolesHierarchy";
  
  @Entity({name: "UserData"})
  export class UserData {
  
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'nvarchar', default: null, length: '50' })
    UserId: string;

    @Column({ type: 'nvarchar', default: null, length: '50' })
    Role: string;

    @ManyToOne(()=> RoleHierarchy, rh => rh.id)
    @JoinColumn({name: "RoleId"})
    RoleId: string;

    @Column({ default: null, type: 'nvarchar', length: '50'})
    Name: string;

    @Column({ default: null, type: 'nvarchar', length: '20'})
    Mobile: string;

    @Column({ default: null, type: 'nvarchar', length: '10'})
    Otp: string;

    @Column({ default: null, type: 'nvarchar', length: '100'})
    Token: string;

    @Column({ default: null, type: 'nvarchar', length: '60'})
    TokenExpirationTime: string;

    @Column({ default: null, type: 'nvarchar', length: '20'})
    DistrictCode: string;

    @Column({ default: null, type: 'nvarchar', length: '20'})
    TalukCode: string;

    @Column({ default: null, type: 'nvarchar', length: '20'})
    Type: string;

    @Column({ default: null, type: 'nvarchar', length: '50'})
    GpOrWard: string;

    @Column({ default: null, type: 'nvarchar', length: '50'})
    VillageCode: string;

    @Column({ default: null, type: 'nvarchar', length: '20'})
    Status: string;

    @Column({ default: null, type: 'nvarchar', length: '10'})
    Version: string;
  
    @Column({ default: null, type: 'nvarchar', length: '100'})
    CreatedRole: string;
  
    @Column({ default: null, type: 'nvarchar', length: '20'})
    CreatedMobile: string;
  
    @Column({ default: null, type: 'nvarchar', length: '30'})
    UpdatedBy: string;
  
    @CreateDateColumn()
    createdDate: Date;
  
    @UpdateDateColumn()
    updatedDate: Date;
  };
  