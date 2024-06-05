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

  @Column({ type: 'nvarchar', default: null, length: 200 })
  AadharHash: string;
  
  @Column({ type: 'nvarchar', default: null, length: 100 })
  Dob: string;

  @Column({ type: 'nvarchar', default: null, length: '100' })
  ApplicantName: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  Category: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  Standard: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  RevTalukCode: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  RevTalukName: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  SchoolId: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  District: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  AcademicYear: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  RevDistrictCode: string;

  @Column({ type: 'nvarchar', default: null, length: '300' })
  SchoolAddress: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  RevDistrictName: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  State: string;

  @Column({ type: 'nvarchar', default: null, length: '100' })
  SchoolName: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  CurDistrictLgdCode: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  CurWardLgdCode: string;

  @Column({ type: 'nvarchar', default: null, length: 500 })
  CurAddress: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  CurVillageLocalBodyLgdCode: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  PerDistrictLgdCode: string;

  @Column({ type: 'nvarchar', default: null, length: 500 })
  PerAddress: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  CurStuArea: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  PerTalukLgdCode: string;

  @Column({ type: 'nvarchar', default: null, length: '100' })
  PerVillageLocalBodyLgdCode: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  PerStuArea: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  CurTalukLgdCode: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  DataType: string;

  @Column({ type: 'nvarchar', default: null, length: '100' })
  StudentMigratedDate: string;

  @Column({ type: 'nvarchar', default: null, length: '100' })
  StudentMigratedFrom: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  Status: string;

  @CreateDateColumn()
  CreatedDate: Date;

  @UpdateDateColumn()
  UpdatedDate: Date;

};