import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn
  } from "typeorm";
  
  @Entity( { name: "MasterData"} )
  export class MasterData {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ default: null, type: 'nvarchar', length: '100' })
    DistrictName: string;
  
    @Column({ default: null, type: 'nvarchar', length: '100'})
    DistrictCode: string;
  
    @Column({ default: null, type: 'nvarchar', length: '100'})
    TalukCode: string;
  
    @Column({ default: null, type: 'nvarchar', length: '100'})
    TalukName: string;
  
    @Column({ default: null, type: 'nvarchar', length: '100'})
    GramPanchayatCode: string;
  
    @Column({ default: null, type: 'nvarchar', length: '100'})
    GramPanchayatName: string;
  
    @Column({ default: null, type: 'nvarchar', length: '100'})
    VillageCode: string;
  
    @Column({ default: null, type: 'nvarchar', length: '100'})
    VillageName: string;
  
    @CreateDateColumn()
    createdDate: Date;
  }
  