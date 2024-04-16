import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

@Entity({ name: "StudentAndSchool" })
export class StudentAndSchool {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'nvarchar', default: null, length: '50' })
  FatherName: string;

  @Column({ type: 'nvarchar', default: null, length: '50' })
  UserId: string;

  @Column({ type: 'nvarchar', default: null, length: '10' })
  Gender: string;

  @Column({ type: 'nvarchar', default: null, length: '40' })
  MotherName: string;

  @Column({ type: 'nvarchar', default: null, length: '30' })
  StudentId: string;

  @Column({ type: 'nvarchar', default: null, length: '100' })
  AadharHash: string;
  
  @Column({ type: 'nvarchar', default: null, length: '40' })
  Dob: string;

  @Column({ type: 'nvarchar', default: null, length: '100' })
  ApplicantName: string;

  @Column({ type: 'nvarchar', default: null, length: '20' })
  Category: string;

  @Column({ type: 'nvarchar', default: null, length: '20' })
  Standard: string;

  @Column({ type: 'nvarchar', default: null, length: '20' })
  RevTalukCode: string;

  @Column({ type: 'nvarchar', default: null, length: '20' })
  RevTalukName: string;

  @Column({ type: 'nvarchar', default: null, length: '20' })
  SchoolId: string;

  @Column({ type: 'nvarchar', default: null, length: '20' })
  District: string;

  @Column({ type: 'nvarchar', default: null, length: '20' })
  AcademicYear: string;

  @Column({ type: 'nvarchar', default: null, length: '20' })
  RevDistrictCode: string;

  @Column({ type: 'nvarchar', default: null, length: '300' })
  SchoolAddress: string;

  @Column({ type: 'nvarchar', default: null, length: '30' })
  RevDistrictName: string;

  @Column({ type: 'nvarchar', default: null, length: '30' })
  State: string;

  @Column({ type: 'nvarchar', default: null, length: '100' })
  SchoolName: string;

  @Column({ type: 'nvarchar', default: null, length: '30' })
  CurDistrictLgdCode: string;

  @Column({ type: 'nvarchar', default: null, length: '30' })
  CurWardLgdCode: string;

  @Column({ type: 'nvarchar', default: null, length: '300' })
  CurAddress: string;

  @Column({ type: 'nvarchar', default: null, length: '20' })
  CurVillageLocalBodyLgdCode: string;

  @Column({ type: 'nvarchar', default: null, length: '20' })
  PerDistrictLgdCode: string;

  @Column({ type: 'nvarchar', default: null, length: '20' })
  PerAddress: string;

  @Column({ type: 'nvarchar', default: null, length: '20' })
  CurStuArea: string;

  @Column({ type: 'nvarchar', default: null, length: '20' })
  PerTalukLgdCode: string;

  @Column({ type: 'nvarchar', default: null, length: '100' })
  PerVillageLocalBodyLgdCode: string;

  @Column({ type: 'nvarchar', default: null, length: '20' })
  PerStuArea: string;

  @Column({ type: 'nvarchar', default: null, length: '20' })
  CurTalukLgdCode: string;

  @Column({ type: 'nvarchar', default: null, length: '20' })
  DataType: string;

  @Column({ type: 'nvarchar', default: null, length: '100' })
  StudentMigratedDate: string;

  @Column({ type: 'nvarchar', default: null, length: '100' })
  StudentMigratedFrom: string;

  @Column({ type: 'nvarchar', default: null, length: '20' })
  Status: string;

  @CreateDateColumn()
  CreatedDate: Date;

  @UpdateDateColumn()
  UpdatedDate: Date;

};