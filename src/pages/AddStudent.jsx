import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { UserPlus, CheckCircle } from 'lucide-react'
import { PageWrapper, StudentCard, PageAccent } from '@/components'
import { useStudents } from '@/hooks/useStudents'
import { studentSchema } from '@/utils/zodSchemas'
import { FORM_LABELS } from '@/utils/constants'

function FieldError({ message }) {
  return (
    <motion.p
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="text-error-400 text-xs mt-2 overflow-hidden"
      role="alert"
    >
      {message}
    </motion.p>
  )
}

function FormInput({ label, error, registration, type = 'text', placeholder }) {
  return (
    <div>
      <label className="block text-text-secondary text-xs font-medium uppercase tracking-wide mb-2.5">
        {label}
        <input
          type={type}
          placeholder={placeholder}
          {...registration}
          className={`w-full px-5 py-3.5 mt-2.5 rounded-xl bg-base-800/80 border text-text-primary text-body font-body
            placeholder:text-text-muted/50
            focus:outline-none focus:ring-2 focus:ring-accent-500/30
            transition-all
            ${error ? 'border-error-400/50 focus:ring-error-400/30' : 'border-border-subtle focus:border-accent-500/40'}`}
        />
      </label>
      <AnimatePresence>
        {error && <FieldError message={error.message} />}
      </AnimatePresence>
    </div>
  )
}

export default function AddStudent() {
  const { addStudent } = useStudents()
  const [lastAdded, setLastAdded] = useState(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(studentSchema),
    defaultValues: { name: '', email: '', phone: '', gender: undefined },
  })

  const selectedGender = watch('gender')

  function onSubmit(data) {
    const student = addStudent(data)
    setLastAdded(student)
    reset()
    toast.success('Student added successfully!', {
      style: {
        background: '#181b24',
        color: '#f1f5f9',
        border: '1px solid rgba(34, 197, 94, 0.3)',
      },
      iconTheme: { primary: '#22c55e', secondary: '#181b24' },
    })
  }

  return (
    <PageWrapper>
      <div className="max-w-xl mx-auto">
        <div className="flex items-center gap-4 mb-10">
          <PageAccent variant="orb" />
          <div>
            <h1 className="font-display text-h1 font-bold text-text-primary">Add Student</h1>
            <p className="text-text-secondary text-body mt-1">Register a new student to the portal</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="glass-card p-8 space-y-6" noValidate>
          <FormInput
            label={FORM_LABELS.name}
            placeholder="John Doe"
            error={errors.name}
            registration={register('name')}
          />
          <FormInput
            label={FORM_LABELS.email}
            placeholder="john@example.com"
            type="email"
            error={errors.email}
            registration={register('email')}
          />
          <FormInput
            label={FORM_LABELS.phone}
            placeholder="1234567890"
            type="tel"
            error={errors.phone}
            registration={register('phone')}
          />

          <fieldset>
            <legend className="block text-text-secondary text-xs font-medium uppercase tracking-wide mb-3">
              {FORM_LABELS.gender}
            </legend>
            <div className="flex gap-4" role="radiogroup" aria-label="Gender selection">
              {['male', 'female'].map((g) => (
                <button
                  key={g}
                  type="button"
                  role="radio"
                  aria-checked={selectedGender === g}
                  onClick={() => setValue('gender', g, { shouldValidate: true })}
                  className={`flex-1 py-3 rounded-xl text-body font-medium capitalize cursor-pointer transition-all border
                    ${selectedGender === g
                      ? 'bg-accent-500/20 text-accent-400 border-accent-500/40 shadow-glow-sm'
                      : 'bg-base-800/50 text-text-muted border-border-subtle hover:border-border-glow hover:text-text-secondary'
                    }`}
                >
                  {g}
                </button>
              ))}
            </div>
            <AnimatePresence>
              {errors.gender && <FieldError message={errors.gender.message} />}
            </AnimatePresence>
          </fieldset>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.01, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 rounded-xl font-display font-semibold text-body text-white
              bg-gradient-to-r from-accent-500 to-accent-600
              shadow-glow-sm hover:shadow-glow-md
              transition-shadow cursor-pointer
              disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center justify-center gap-2.5"
          >
            <UserPlus className="w-5 h-5" />
            {FORM_LABELS.submit}
          </motion.button>
        </form>

        <AnimatePresence>
          {lastAdded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="mt-8"
            >
              <div className="flex items-center gap-2 text-success-400 text-sm font-medium mb-4">
                <CheckCircle className="w-4 h-4" />
                Recently Added
              </div>
              <StudentCard
                name={lastAdded.name}
                email={lastAdded.email}
                phone={lastAdded.phone}
                index={0}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageWrapper>
  )
}
