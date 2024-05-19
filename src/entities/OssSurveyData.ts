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

  @Column({ type: 'nvarchar', default: null, length: '50' })
  ParentName: string;

  @Column({ type: 'nvarchar', default: null, length: '50' })
  RCNumber: string;

  @Column({ type: 'nvarchar', default: null, length: '10' })
  ParentGender: string;

  @Column({ type: 'nvarchar', default: null, length: '50' })
  ParentRelation: string;

  @Column({ type: 'nvarchar', default: null, length: '30' })
  ParentDob: string;

  @Column({ type: 'nvarchar', default: null, length: '50' })
  ParentMemberId: string;

  @Column({ type: 'nvarchar', default: null, length: '12' })
  ParentMobile: string;

  @Column({ type: 'nvarchar', default: null, length: '200' })
  ParentAddress: string;

<<<<<<< Updated upstream
  @Column({ type: 'nvarchar', default: null, length: '20' })
=======
  @Column({ type: 'nvarchar', default: null, length: '200' })
  ParentAadhar: string;

  @Column({ type: 'nvarchar', default: null, length: '50' })
>>>>>>> Stashed changes
  ParentCategory: string;

  @Column({ type: 'nvarchar', default: null, length: '20' })
  ParentOccupation: string;

  @Column({ type: 'nvarchar', default: null, length: '100' })
  StudentId: string;

  @Column({ type: 'nvarchar', default: null, length: '50' })
  StudentName: string;

  @Column({ type: 'nvarchar', default: null, length: '50' })
  StudentMemberId: string;
  
  @Column({ type: 'nvarchar', default: null, length: '20' })
  StudentRelation: string;
  
  @Column({ type: 'nvarchar', default: null, length: '30' })
  StudentDob: string;
  
  @Column({ type: 'nvarchar', default: null, length: '20' })
  StudentGender: string;
  
  @Column({ type: 'nvarchar', default: null, length: '50' })
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

  @Column({ type: 'nvarchar', default: null, length: '200' })
  SchoolAddress: string;

  @Column({ type: 'nvarchar', default: null, length: '59' })
  StudentLAS_Date: string;

  @Column({ type: 'nvarchar', default: null, length: '50' })
  StudentNotGoing: string;

  @Column({ type: 'nvarchar', default: null, length: '50' })
  StudentMedical: string;

  @Column({ type: 'nvarchar', default: null, length: '100' })
  StudentFinancial: string;

  @Column({ type: 'nvarchar', default: null, length: '100' })
  StudentSocial: string;

  @Column({ type: 'nvarchar', default: null, length: '100' })
  StudentOther: string;

  @Column({ type: 'nvarchar', default: null, length: '20' })
  StudentDisabilityType: string;

  @Column({ type: 'nvarchar', default: null, length: '100' })
  StudentSpecialSupport: string;

  @Column({ type: 'nvarchar', default: null, length: '30' })
  StudentDisability: string;

  @Column({ type: 'nvarchar', default: null, length: '30' })
  Status: string;

  @Column({ type: 'nvarchar', default: null, length: '50' })
  UserId: string;

  @Column({ type: 'nvarchar', default: null, length: '30' })
  SurveyMode: string;

  @CreateDateColumn()
  CreatedDate: Date;

  @UpdateDateColumn()
  UpdatedDate: Date;

};