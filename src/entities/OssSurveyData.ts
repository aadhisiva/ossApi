import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

@Entity({ name: "OssSurveyData" })
export class OssSurveyData {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  ParentName: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  RCNumber: string;

  @Column({ type: 'nvarchar', default: null, length: '10' })
  ParentGender: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  ParentRelation: string;

  @Column({ type: 'nvarchar', default: null, length: '30' })
  ParentDob: string;

  @Column({ type: 'nvarchar', default: null, length: '200' })
  ParentEducation: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  ParentMemberId: string;

  @Column({ type: 'nvarchar', default: null, length: 15 })
  ParentMobile: string;

  @Column({ type: 'nvarchar', default: null, length: '500' })
  ParentAddress: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  ParentCategory: string;

  @Column({ type: 'nvarchar', default: null, length: '200' })
  ParentAadhar: string;

  @Column({ type: 'nvarchar', default: null, length: '100' })
  ParentOccupation: string;

  @Column({ type: 'nvarchar', default: null, length: '100' })
  StudentId: string;
 
  @Column({ type: 'nvarchar', default: null, length: '100' })
  ParentWorking: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  StudentName: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  StudentMemberId: string;
  
  @Column({ type: 'nvarchar', default: null, length: '100' })
  StudentRelation: string;
  
  @Column({ type: 'nvarchar', default: null, length: '100' })
  StudentDob: string;
  
  @Column({ type: 'nvarchar', default: null, length: '100' })
  StudentMaskedAadhar: string;
  
  @Column({ type: 'nvarchar', default: null, length: '100' })
  StudentGender: string;
  
  @Column({ type: 'nvarchar', default: null, length: 100 })
  StudentClass: string;
  
  @Column({ type: 'text', default: null })
  StudentImage: string;

  @Column({ type: 'nvarchar', default: null, length: '200' })
  StudentAadharHash: string;

  @Column({ type: 'nvarchar', default: null, length: '100' })
  Category: string;

  @Column({ type: 'nvarchar', default: null, length: '100' })
  Standard: string;

  @Column({ type: 'nvarchar', default: null, length: '100' })
  SchoolName: string;

  @Column({ type: 'nvarchar', default: null, length: '500' })
  SchoolAddress: string;

  @Column({ type: 'nvarchar', default: null, length: '100' })
  StudentLAS_Date: string;

  @Column({ type: 'nvarchar', default: null, length: '100' })
  StudentNotGoing: string;

  @Column({ type: 'nvarchar', default: null, length: '290' })
  StudentMedical: string;

  @Column({ type: 'nvarchar', default: null, length: '100' })
  StudentFinancial: string;

  @Column({ type: 'nvarchar', default: null, length: '100' })
  StudentSocial: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  StudentOther: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  StudentDisabilityType: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  StudentSpecialSupport: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  StudentDisability: string;

  @Column({ type: 'nvarchar', default: null, length: '30' })
  Status: string;

  @Column({ type: 'nvarchar', default: null, length: 100 })
  UserId: string;

  @Column({ type: 'nvarchar', default: null, length: '30' })
  SurveyMode: string;

  @CreateDateColumn()
  CreatedDate: Date;

  @UpdateDateColumn()
  UpdatedDate: Date;

};