'use client';
import React, { useEffect } from 'react';

import { ToastAction } from '@/components/ui/toast';

import { useToast } from '@/components/ui/use-toast';

export default function Toaster() {
  const { toast } = useToast();

  useEffect(() => {
    toast({
      title: '提示：',
      description: '博客数据及项目数据正在迁移中...',
      duration: 1000 * 60 * 60 * 24,
      action: <ToastAction altText='我知道了'>我知道了</ToastAction>,
    });
  }, [toast]);

  return null;
}
