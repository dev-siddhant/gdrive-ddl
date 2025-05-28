import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw } from 'lucide-react';

const serializeError = (error: any) => {
  if (error instanceof Error) {
    return error.message + '\n' + error.stack;
  }
  return JSON.stringify(error, null, 2);
};

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: any;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  handleRefresh = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <motion.div 
          className="min-h-screen flex items-center justify-center p-4 bg-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="w-full max-w-md p-6 bg-card rounded-lg shadow-lg border border-destructive/30 overflow-hidden"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              type: 'spring',
              stiffness: 300,
              damping: 30,
              delay: 0.2
            }}
          >
            <motion.div
              className="flex items-center justify-center mb-4"
              initial={{ scale: 0 }}
              animate={{ 
                scale: 1,
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                delay: 0.5,
                type: 'spring',
                stiffness: 200,
                damping: 10
              }}
            >
              <AlertTriangle className="h-12 w-12 text-destructive" />
            </motion.div>
            
            <motion.h2 
              className="text-xl font-bold text-destructive text-center mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Something went wrong
            </motion.h2>
            
            <motion.div 
              className="relative overflow-hidden p-4 bg-destructive/10 rounded-md mb-4"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <pre className="text-sm overflow-auto max-h-[200px] font-mono text-destructive/90">
                {serializeError(this.state.error)}
              </pre>
            </motion.div>
            
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <motion.button
                onClick={this.handleRefresh}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 500, damping: 10 }}
              >
                <RefreshCw className="h-4 w-4" />
                Refresh Page
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      );
    }

    return this.props.children;
  }
}