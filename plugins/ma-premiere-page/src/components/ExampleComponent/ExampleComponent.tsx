import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent, Button, Grid, Tab, Tabs, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  Header,
  Page,
  Content,
  ContentHeader,
} from '@backstage/core-components';
import {
  TrendingUp as TrendingUpIcon,
  Storage as ServerIcon,
  People as UsersIcon,
  Timeline as TimelineIcon,
  Warning as AlertTriangleIcon,
  CheckCircle as CheckCircleIcon,
  AccessTime as ClockIcon,
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    minHeight: '100vh',
  },
  metricCard: {
    background: 'linear-gradient(145deg, #ffffff 0%, #f8f9ff 100%)',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: '0 16px 48px rgba(0,0,0,0.15)',
    },
  },
  chartCard: {
    background: 'rgba(255,255,255,0.95)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    border: '1px solid rgba(255,255,255,0.2)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.1)',
  },
  glowingButton: {
    background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
    border: 0,
    borderRadius: '25px',
    color: 'white',
    padding: '12px 30px',
    boxShadow: '0 3px 15px rgba(102, 126, 234, 0.4)',
    transition: 'all 0.3s ease',
    '&:hover': {
      boxShadow: '0 6px 25px rgba(102, 126, 234, 0.6)',
      transform: 'translateY(-2px)',
    },
  },
  animatedCounter: {
    fontSize: '3rem',
    fontWeight: 'bold',
    background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
    backgroundClip: 'text',
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
    animation: '$pulse 2s infinite',
  },
  '@keyframes pulse': {
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.05)' },
    '100%': { transform: 'scale(1)' },
  },
  statusIndicator: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    animation: '$blink 1.5s infinite',
  },
  '@keyframes blink': {
    '0%, 100%': { opacity: 1 },
    '50%': { opacity: 0.3 },
  },
  modernTab: {
    minWidth: 120,
    fontWeight: 600,
    textTransform: 'none',
    fontSize: '14px',
    color: '#4c1d95',
    '&.Mui-selected': {
      color: '#667eea',
    },
  },
  // Nouvelles classes pour les couleurs de texte
  primaryText: {
    color: '#4c1d95', // Violet foncé
  },
  secondaryText: {
    color: '#6366f1', // Indigo
  },
  accentText: {
    color: '#667eea', // Bleu-violet
  },
  headerText: {
    color: '#312e81', // Violet très foncé
    fontWeight: 600,
  },
  subtitleText: {
    color: '#5b21b6', // Violet foncé
  },
  placeholderText: {
    color: '#6366f1', // Indigo
    fontWeight: 500,
  },
}));

// Composant MetricCard modernisé
const MetricCard = ({ title, value, icon: Icon, trend, color, classes }) => (
  <Card className={classes.metricCard}>
    <CardContent>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography variant="h6" className={classes.secondaryText} style={{ fontWeight: 500 }}>
            {title}
          </Typography>
          <Typography className={classes.animatedCounter}>
            {typeof value === 'number' ? value.toLocaleString() : value}
          </Typography>
          {trend && (
            <Typography 
              variant="body2" 
              style={{ 
                color: trend > 0 ? '#10b981' : '#ef4444',
                fontWeight: 600,
                marginTop: '4px'
              }}
            >
              {trend > 0 ? '↗' : '↘'} {Math.abs(trend)}% vs last week
            </Typography>
          )}
        </Box>
        <Box
          style={{
            background: `${color}20`,
            borderRadius: '16px',
            padding: '16px',
          }}
        >
          <Icon style={{ color, fontSize: '32px' }} />
        </Box>
      </Box>
    </CardContent>
  </Card>
);

// Composant ServiceStatus
const ServiceStatus = ({ name, status, responseTime, classes }) => {
  const statusColors = {
    healthy: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444'
  };

  const StatusIcon = status === 'healthy' ? CheckCircleIcon : 
                     status === 'warning' ? ClockIcon : AlertTriangleIcon;

  return (
    <Box 
      display="flex" 
      alignItems="center" 
      justifyContent="space-between"
      p={2}
      style={{
        background: 'rgba(255,255,255,0.8)',
        borderRadius: '12px',
        margin: '8px 0',
        border: `2px solid ${statusColors[status]}20`,
      }}
    >
      <Box display="flex" alignItems="center">
        <StatusIcon style={{ color: statusColors[status], marginRight: '12px' }} />
        <Box>
          <Typography variant="subtitle1" className={classes.primaryText} style={{ fontWeight: 600 }}>
            {name}
          </Typography>
          <Typography variant="caption" className={classes.secondaryText}>
            Response: {responseTime}ms
          </Typography>
        </Box>
      </Box>
      <Box display="flex" alignItems="center">
        <div 
          className={classes.statusIndicator}
          style={{ backgroundColor: statusColors[status], marginRight: '8px' }}
        />
        <Typography 
          variant="caption" 
          style={{ 
            color: statusColors[status], 
            fontWeight: 600,
            textTransform: 'uppercase'
          }}
        >
          {status}
        </Typography>
      </Box>
    </Box>
  );
};

// Composant principal
export const ExampleComponent = () => {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState(0);
  const [metrics, setMetrics] = useState({
    activeUsers: 2847,
    deployments: 156,
    services: 42,
    incidents: 3,
    performance: 94.2
  });

  const [deploymentHistory, setDeploymentHistory] = useState([
    { time: '09:00', deployments: 5, success: 5 },
    { time: '10:00', deployments: 8, success: 7 },
    { time: '11:00', deployments: 12, success: 11 },
    { time: '12:00', deployments: 15, success: 14 },
    { time: '13:00', deployments: 10, success: 10 },
  ]);

  const services = [
    { name: 'API Gateway', status: 'healthy', responseTime: 45 },
    { name: 'User Service', status: 'healthy', responseTime: 32 },
    { name: 'Payment Service', status: 'warning', responseTime: 156 },
    { name: 'Notification Service', status: 'healthy', responseTime: 28 },
    { name: 'Analytics Service', status: 'error', responseTime: 2340 },
  ];

  // Animation des métriques
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 20) - 10,
        deployments: prev.deployments + Math.floor(Math.random() * 3),
        incidents: Math.max(0, prev.incidents + Math.floor(Math.random() * 3) - 1),
        performance: Math.max(90, Math.min(99.9, prev.performance + (Math.random() - 0.5) * 2))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const TabPanel = ({ children, value, index }) => (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box pt={3}>{children}</Box>}
    </div>
  );

  return (
    <div className={classes.root}>
      <Page themeId="tool">
        <Header 
          title="Platform Engineering Dashboard" 
          subtitle="Real-time insights into your development ecosystem"
        />
        <Content>
          <ContentHeader title="Live Demo - Enterprise Platform Dashboard">
            <Typography className={classes.subtitleText} style={{ fontSize: '16px' }}>
              Monitoring 42 services • 2.8K active users • 156 deployments today
            </Typography>
          </ContentHeader>

          {/* Navigation moderne */}
          <Box mb={4}>
            <Tabs 
              value={activeTab} 
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              style={{
                background: 'rgba(255,255,255,0.9)',
                borderRadius: '16px',
                padding: '4px',
              }}
            >
              <Tab label="Overview" className={classes.modernTab} />
              <Tab label="Deployments" className={classes.modernTab} />
              <Tab label="Health Check" className={classes.modernTab} />
              <Tab label="Team Analytics" className={classes.modernTab} />
            </Tabs>
          </Box>

          {/* Métriques principales */}
          <Grid container spacing={3} style={{ marginBottom: '32px' }}>
            <Grid item xs={12} sm={6} md={3}>
              <MetricCard
                title="Active Users"
                value={metrics.activeUsers}
                icon={UsersIcon}
                trend={12.5}
                color="#3b82f6"
                classes={classes}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <MetricCard
                title="Deployments"
                value={metrics.deployments}
                icon={TrendingUpIcon}
                trend={8.2}
                color="#10b981"
                classes={classes}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <MetricCard
                title="Services"
                value={metrics.services}
                icon={ServerIcon}
                trend={0}
                color="#8b5cf6"
                classes={classes}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <MetricCard
                title="System Health"
                value={`${metrics.performance.toFixed(1)}%`}
                icon={TimelineIcon}
                trend={2.1}
                color="#06b6d4"
                classes={classes}
              />
            </Grid>
          </Grid>

          {/* Contenu des onglets */}
          <TabPanel value={activeTab} index={0}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Card className={classes.chartCard}>
                  <CardContent style={{ padding: '32px' }}>
                    <Typography variant="h5" className={classes.headerText} style={{ marginBottom: '24px' }}>
                      Performance Trends
                    </Typography>
                    <Box 
                      height="300px" 
                      display="flex" 
                      alignItems="center" 
                      justifyContent="center"
                      flexDirection="column"
                      style={{
                        background: 'linear-gradient(135deg, #667eea20 0%, #764ba220 100%)',
                        borderRadius: '12px',
                      }}
                    >
                      <Typography variant="h6" className={classes.placeholderText} style={{ textAlign: 'center' }}>
                        Real-time performance visualization
                      </Typography>
                      <Typography variant="body1" className={classes.accentText} style={{ textAlign: 'center', marginTop: '8px' }}>
                        CPU: 78% • Memory: 65% • Network: 234 MB/s
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Card className={classes.chartCard}>
                  <CardContent style={{ padding: '24px' }}>
                    <Typography variant="h6" className={classes.headerText} style={{ marginBottom: '16px' }}>
                      Quick Actions
                    </Typography>
                    <Box display="flex" flexDirection="column" gap={2}>
                      <Button className={classes.glowingButton} fullWidth>
                        Deploy to Production
                      </Button>
                      <Button className={classes.glowingButton} fullWidth>
                        View Logs
                      </Button>
                      <Button className={classes.glowingButton} fullWidth>
                        Scale Services
                      </Button>
                      <Button className={classes.glowingButton} fullWidth>
                        Generate Report
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={activeTab} index={1}>
            <Card className={classes.chartCard}>
              <CardContent style={{ padding: '32px' }}>
                <Typography variant="h5" className={classes.headerText} style={{ marginBottom: '24px' }}>
                  Deployment Pipeline
                </Typography>
                <Grid container spacing={2}>
                  {deploymentHistory.map((deploy, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Box
                        p={3}
                        style={{
                          background: 'linear-gradient(135deg, #10b98120 0%, #3b82f620 100%)',
                          borderRadius: '16px',
                          border: '1px solid #10b98140',
                        }}
                      >
                        <Typography variant="h6" className={classes.primaryText} style={{ fontWeight: 600 }}>
                          {deploy.time}
                        </Typography>
                        <Typography variant="body1" className={classes.secondaryText}>
                          {deploy.success}/{deploy.deployments} successful
                        </Typography>
                        <Typography variant="caption" style={{ color: '#10b981' }}>
                          {((deploy.success / deploy.deployments) * 100).toFixed(0)}% success rate
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </TabPanel>

          <TabPanel value={activeTab} index={2}>
            <Card className={classes.chartCard}>
              <CardContent style={{ padding: '32px' }}>
                <Typography variant="h5" className={classes.headerText} style={{ marginBottom: '24px' }}>
                  Service Health Monitor
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    {services.map((service, index) => (
                      <ServiceStatus key={index} {...service} classes={classes} />
                    ))}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </TabPanel>

          <TabPanel value={activeTab} index={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card className={classes.chartCard}>
                  <CardContent style={{ padding: '32px' }}>
                    <Typography variant="h6" className={classes.headerText} style={{ marginBottom: '24px' }}>
                      Team Performance
                    </Typography>
                    <Box display="flex" flexDirection="column" gap={2}>
                      {['Development', 'DevOps', 'QA', 'Product'].map((team, index) => (
                        <Box key={index} display="flex" justifyContent="space-between" alignItems="center">
                          <Typography className={classes.primaryText}>{team}</Typography>
                          <Box display="flex" alignItems="center" gap={1}>
                            <Box 
                              width="100px" 
                              height="8px" 
                              borderRadius="4px"
                              style={{ background: '#e5e7eb' }}
                            >
                              <Box
                                width={`${60 + index * 10}%`}
                                height="100%"
                                borderRadius="4px"
                                style={{ background: `hsl(${index * 60}, 70%, 50%)` }}
                              />
                            </Box>
                            <Typography variant="caption" className={classes.accentText}>{60 + index * 10}%</Typography>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card className={classes.chartCard}>
                  <CardContent style={{ padding: '32px' }}>
                    <Typography variant="h6" className={classes.headerText} style={{ marginBottom: '24px' }}>
                      Team Metrics
                    </Typography>
                    <Box 
                      height="200px" 
                      display="flex" 
                      alignItems="center" 
                      justifyContent="center"
                      flexDirection="column"
                      style={{
                        background: 'linear-gradient(135deg, #667eea20 0%, #764ba220 100%)',
                        borderRadius: '12px',
                      }}
                    >
                      <Typography variant="h6" className={classes.placeholderText} style={{ textAlign: 'center' }}>
                        Team productivity analytics
                      </Typography>
                      <Typography variant="body1" className={classes.accentText} style={{ textAlign: 'center', marginTop: '8px' }}>
                        Velocity • Burndown • Sprint metrics
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>

        </Content>
      </Page>
    </div>
  );
};