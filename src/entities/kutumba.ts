import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
  } from "typeorm";
  
  @Entity({ name: "Kutumba" })
  export class Kutumba {
    
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'nvarchar', default: null })
    KutumbaUniqueId: string;
  
    @Column({ type: 'nvarchar', default: null, length: '20' })
    MBR_CASTE_CATEGORY: string;
  
    @Column({ type: 'nvarchar', default: null, length: '30' })
    MBR_EDUCATION_ID: string;
  
    @Column({ type: 'nvarchar', default: null, length: '30' })
    FAMILY_ID: string;
  
    @Column({ type: 'nvarchar', default: null, length: '30' })
    FCS_DISTRICT_NAME: string;
  
    @Column({ type: 'nvarchar', default: null, length: '30' })
    MEMBER_ID: string;
  
    @Column({ type: 'nvarchar', default: null, length: '10' })
    FCS_DISTRICT_CODE: string;
  
    @Column({ type: 'nvarchar', default: null, length: '30' })
    FCS_GP_CODE: string;
  
    @Column({ type: 'nvarchar', default: null, length: '30' })
    FCS_GP_NAME: string;
  
    @Column({ type: 'nvarchar', default: null, length: '30' })
    FCS_TALUK_CODE: string;
  
    @Column({ type: 'nvarchar', default: null, length: '30' })
    FCS_TALUK_NAME: string;
  
    @Column({ type: 'nvarchar', default: null, length: '30' })
    FCS_VILLAGE_CODE: string;
  
    @Column({ type: 'nvarchar', default: null, length: '30' })
    FCS_VILLAGE_NAME: string;
  
    @Column({ type: 'nvarchar', default: null, length: '30' })
    LGD_DISTRICT_CODE: string;
  
    @Column({ type: 'nvarchar', default: null, length: '30' })
    LGD_DISTRICT_Name: string;
  
    @Column({ type: 'nvarchar', default: null, length: '30' })
    LGD_TALUK_CODE: string;
  
    @Column({ type: 'nvarchar', default: null, length: '30' })
    LGD_TALUK_Name: string;
  
    @Column({ type: 'nvarchar', default: null, length: '30' })
    LGD_VILLAGE_CODE: string;
  
    @Column({ type: 'nvarchar', default: null, length: '30' })
    LGD_VILLAGE_Name: string;
  
    @Column({ type: 'nvarchar', default: null, length: '30' })
    MBR_AADHAR_NO: string;
  
    @Column({ type: 'nvarchar', default: null, length: '30' })
    MBR_RCAREA: string;
  
    @Column({ type: 'nvarchar', default: null, length: '50' })
    MEMBER_NAME_ENG: string;
  
    @Column({ type: 'nvarchar', default: null, length: '30' })
    RC_NUMBER: string;
  
    @Column({ type: 'nvarchar', default: null, length: '30' })
    RC_STATUS: string;
  
    @Column({ type: 'nvarchar', default: null, length: '30' })
    RC_TYPE: string;
  
    @Column({ type: 'nvarchar', default: null, length: '30' })
    RELATION_NAME: string;
  
    @Column({ type: 'nvarchar', default: null, length: '30' })
    MBR_DOB: string;
  
    @Column({ type: 'nvarchar', default: null, length: '30' })
    MBR_GENDER: string;
  
    @Column({ type: 'nvarchar', default: null, length: '40' })
    MEMBER_NAME_KAN: string;
  
    @Column({ type: 'nvarchar', default: null, length: '30' })
    MBR_PINCODE: string;
  
    @Column({ type: 'nvarchar', default: null, length: '300' })
    MBR_ADDRESS: string;
  
    @Column({ type: 'nvarchar', default: null, length: '300' })
    MBR_HASH_AADHAR: string;
  
    @Column({ type: 'nvarchar', default: null, length: '30' })
    Kutumba_ID_status: string;
  
    @Column({ type: 'nvarchar', default: null, length: '500' })
    UserId: string;
  
    @CreateDateColumn()
    CreatedDate: Date;
  
    @UpdateDateColumn()
    UpdatedDate: Date;
  
  };