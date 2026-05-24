export interface ListTransferItemResponseDto {
  id: string
  name: string
  amount: number
  notes?: string
  dueDate: string
  entryDate: string
  effectivatedDate?: string
  effectivated: boolean
  accountIdOrigin: string
  accountOriginName: string
  accountIdDestination: string
  accountDestinationName: string
}
