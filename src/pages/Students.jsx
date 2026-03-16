import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { AlertCircle, RefreshCw, Users, Inbox } from 'lucide-react'
import { PageWrapper, StudentCard, SkeletonCard, PageAccent } from '@/components'
import { fetchUsers, USERS_QUERY_KEY } from '@/services/api'

export default function Students() {
  const { data: users, isLoading, isError, error, refetch } = useQuery({
    queryKey: USERS_QUERY_KEY,
    queryFn: fetchUsers,
    staleTime: 5 * 60 * 1000,
  })

  useEffect(() => { }, [users])

  if (isLoading) {
    return (
      <PageWrapper>
        <div className="section-container">
          <div className="flex items-center gap-4 mb-10">
            <PageAccent variant="ring" />
            <div>
              <h1 className="font-display text-h1 font-bold text-text-primary">Students</h1>
              <p className="text-text-secondary text-body mt-1">Loading student directory...</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 10 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </PageWrapper>
    )
  }

  if (isError) {
    return (
      <PageWrapper>
        <div className="max-w-lg mx-auto text-center">
          <div className="glass-card p-10">
            <AlertCircle className="w-14 h-14 text-error-400 mx-auto mb-5" />
            <h2 className="font-display text-h2 text-text-primary mb-3">Failed to Load Students</h2>
            <p className="text-text-secondary text-body mb-8">{error?.message || 'An error occurred while fetching data.'}</p>
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => refetch()}
              className="btn-secondary px-8 py-3"
            >
              <RefreshCw className="w-5 h-5" />
              Try Again
            </motion.button>
          </div>
        </div>
      </PageWrapper>
    )
  }

  const isEmpty = !users || users.length === 0

  if (isEmpty) {
    return (
      <PageWrapper>
        <div className="max-w-lg mx-auto text-center">
          <div className="glass-card p-10">
            <Inbox className="w-14 h-14 text-text-muted mx-auto mb-5" />
            <h2 className="font-display text-h2 text-text-primary mb-3">No Students Found</h2>
            <p className="text-text-secondary text-body">The directory is currently empty. Check back later or add a new student.</p>
          </div>
        </div>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <div className="section-container">
        <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <PageAccent variant="ring" />
            <div>
              <h1 className="font-display text-h1 font-bold text-text-primary">Students</h1>
              <p className="text-text-secondary text-body mt-1">Browse the student directory from the network</p>
            </div>
          </div>
          <div className="glass-panel rounded-xl px-5 py-3 flex items-center gap-2.5">
            <Users className="w-5 h-5 text-accent-400" />
            <span className="font-display font-semibold text-body text-text-primary">{users.length}</span>
            <span className="text-text-muted text-sm">students</span>
          </div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {users.map((user, i) => (
            <StudentCard
              key={user.id}
              name={user.name}
              email={user.email}
              phone={user.phone}
              index={i}
            />
          ))}
        </motion.div>
      </div>
    </PageWrapper>
  )
}
