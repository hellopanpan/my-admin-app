export interface IfetchMyInfoRes {
  companyId: number
  companyName: string
  createTime: string
  headImg: string
  id: number
  mobile: string
  name: string
  roleIdSet: Array<AuthNumber>
  // todo: ts
  roleNameSet: Array<string>
  subCompanyId: Array<number>
  subCompanyName: Array<string>
}
