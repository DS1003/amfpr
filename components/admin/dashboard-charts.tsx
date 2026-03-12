"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Cell, PieChart, Pie } from 'recharts'
import { motion } from 'framer-motion'

interface ChartData {
    name: string
    value: number
}

interface DashboardChartsProps {
    articleStats: ChartData[]
    distribution: ChartData[]
}

export function DashboardCharts({ articleStats, distribution }: DashboardChartsProps) {
    const COLORS = ['#1B3129', '#E6A34F', '#F4E3C1']

    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Activity Trend */}
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-8 rounded-[2.5rem] border border-border/60 shadow-sm"
            >
                <div className="flex items-center justify-between mb-8">
                    <h3 className="font-serif font-bold text-xl text-primary">Tendance du Contenu</h3>
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">7 derniers mois</span>
                </div>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={articleStats}>
                            <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#E6A34F" stopOpacity={0.1}/>
                                    <stop offset="95%" stopColor="#E6A34F" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                            <XAxis 
                                dataKey="name" 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} 
                                dy={10}
                            />
                            <YAxis 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} 
                            />
                            <Tooltip 
                                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', fontWeight: 700, fontSize: '12px' }}
                            />
                            <Area 
                                type="monotone" 
                                dataKey="value" 
                                stroke="#E6A34F" 
                                strokeWidth={3} 
                                fillOpacity={1} 
                                fill="url(#colorValue)" 
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            {/* Content Distribution */}
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-8 rounded-[2.5rem] border border-border/60 shadow-sm"
            >
                <div className="flex items-center justify-between mb-8">
                    <h3 className="font-serif font-bold text-xl text-primary">Distribution</h3>
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Par type d'entité</span>
                </div>
                <div className="h-[300px] w-full flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={distribution}
                                cx="50%"
                                cy="50%"
                                innerRadius={80}
                                outerRadius={110}
                                paddingAngle={5}
                                dataKey="value"
                                stroke="none"
                            >
                                {distribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip 
                                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', fontWeight: 700, fontSize: '12px' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute flex flex-col items-center">
                        <span className="text-3xl font-black text-primary tracking-tighter">
                            {distribution.reduce((acc, curr) => acc + curr.value, 0)}
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">Total</span>
                    </div>
                </div>
                <div className="flex justify-center gap-6 mt-4">
                    {distribution.map((entry, index) => (
                        <div key={entry.name} className="flex items-center gap-2">
                            <div className="size-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{entry.name}</span>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    )
}
