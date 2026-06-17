import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAccountRepository } from '../../../network/repository/AccountRepository/hook/useAccountRepository.ts'
import { useCategoryRepository } from '../../../network/repository/CategoryRepository/hook/useCategoryRepository.ts'
import { useTransactionRepository } from '../../../network/repository/TransactionRepository/hook/useTransactionRepository.ts'
import { useMonthlyDate } from '../../../hooks/useMonthlyDate.ts'
import type { ListCategoriesItemResponseDto } from '../../../network/repository/CategoryRepository/dtos/index.ts'

type TransactionKind = 'INCOME' | 'EXPENSE'

export interface TransactionFormState {
  type: TransactionKind
  name: string
  amount: string
  dueDate: string
  entryDate: string
  effectivated: boolean
  effectivatedDate: string
  accountId: string
  categoryId: string
  subCategoryId: string
  notes: string
}

const toInputDate = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const inputDateToIso = (value: string) => new Date(`${value}T12:00:00.000`).toISOString()

const initialToday = toInputDate(new Date())

const INITIAL_FORM: TransactionFormState = {
  type: 'EXPENSE',
  name: '',
  amount: '',
  dueDate: initialToday,
  entryDate: initialToday,
  effectivated: false,
  effectivatedDate: initialToday,
  accountId: '',
  categoryId: '',
  subCategoryId: '',
  notes: '',
}

function findSelectedCategory(
  categories: ListCategoriesItemResponseDto[],
  categoryId: string,
): ListCategoriesItemResponseDto | undefined {
  return categories.find((category) => category.id === categoryId)
}

export function useTransactionFormController() {
  const navigate = useNavigate()
  const { endDate } = useMonthlyDate()
  const [form, setForm] = useState<TransactionFormState>(INITIAL_FORM)
  const [successMessage, setSuccessMessage] = useState('')

  const { data: accounts = [], isLoading: isLoadingAccounts } = useAccountRepository(
    'getAccounts',
    {
      params: { endDate },
    },
  )
  const { data: incomeCategories = [], isLoading: isLoadingIncomeCategories } =
    useCategoryRepository('getIncome')
  const { data: expenseCategories = [], isLoading: isLoadingExpenseCategories } =
    useCategoryRepository('getExpense')
  const registerIncome = useTransactionRepository('registerNewIncome')
  const registerExpense = useTransactionRepository('registerNewExpense')

  const categories = form.type === 'INCOME' ? incomeCategories : expenseCategories
  const selectedCategory = useMemo(
    () => findSelectedCategory(categories, form.categoryId),
    [categories, form.categoryId],
  )
  const subCategories = selectedCategory?.subCategories ?? []
  const activeMutation = form.type === 'INCOME' ? registerIncome : registerExpense
  const isLoading = isLoadingAccounts || isLoadingIncomeCategories || isLoadingExpenseCategories

  const updateField = <K extends keyof TransactionFormState>(
    field: K,
    value: TransactionFormState[K],
  ) => {
    setSuccessMessage('')
    setForm((current) => ({ ...current, [field]: value }))
  }

  const updateType = (type: TransactionKind) => {
    setSuccessMessage('')
    setForm((current) => ({ ...current, type, categoryId: '', subCategoryId: '' }))
  }

  const updateCategory = (categoryId: string) => {
    setSuccessMessage('')
    setForm((current) => ({ ...current, categoryId, subCategoryId: '' }))
  }

  const submit = async () => {
    const basePayload = {
      name: form.name.trim(),
      amount: Number(form.amount),
      dueDate: inputDateToIso(form.dueDate),
      entryDate: inputDateToIso(form.entryDate),
      effectivated: form.effectivated,
      accountId: form.accountId,
      categoryId: form.categoryId,
      subCategoryId: form.subCategoryId,
      notes: form.notes.trim() || undefined,
    }

    if (form.type === 'INCOME') {
      await registerIncome.mutateAsync({
        ...basePayload,
        receiptDate: form.effectivated ? inputDateToIso(form.effectivatedDate) : undefined,
      })
      setSuccessMessage('Receita cadastrada com sucesso')
    } else {
      await registerExpense.mutateAsync({
        ...basePayload,
        paymentDate: form.effectivated ? inputDateToIso(form.effectivatedDate) : undefined,
      })
      setSuccessMessage('Despesa cadastrada com sucesso')
    }

    setForm((current) => ({
      ...INITIAL_FORM,
      type: current.type,
      dueDate: toInputDate(new Date()),
      entryDate: toInputDate(new Date()),
      effectivatedDate: toInputDate(new Date()),
    }))
  }

  const goBack = () => navigate('/transactions')

  return {
    form,
    accounts,
    categories,
    subCategories,
    isLoading,
    isSubmitting: activeMutation.isPending,
    errorMessage: activeMutation.error?.message,
    successMessage,
    updateField,
    updateType,
    updateCategory,
    submit,
    goBack,
  }
}
