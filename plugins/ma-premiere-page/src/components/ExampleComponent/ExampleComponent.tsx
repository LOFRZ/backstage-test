import React from 'react';
import { Typography, Card, CardContent, Button, Grid } from '@material-ui/core';
import {
  Header,
  Page,
  Content,
  ContentHeader,
} from '@backstage/core-components';

export const ExampleComponent = () => {
  const [compteur, setCompteur] = React.useState(0);
  const [message, setMessage] = React.useState('Bienvenue !');

  const changerMessage = () => {
    const messages = [
      'Super ! Tu apprends vite 🚀',
      'Excellent travail ! 👏',
      'Tu es un champion ! 🏆', 
      'Continue comme ça ! 💪',
      'Fantastique ! ✨'
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setMessage(randomMessage);
  };

  return (
    <Page themeId="tool">
      <Header 
        title="Ma Première Page" 
        subtitle="Mon premier plugin Backstage créé avec succès !"
      />
      <Content>
        <ContentHeader title="🎉 Félicitations ! Ton plugin fonctionne !">
          <Typography>
            Tu as réussi à créer et lancer ton premier plugin Backstage !
          </Typography>
        </ContentHeader>
        
        <Grid container spacing={3}>
          {/* Carte du compteur */}
          <Grid item md={6} xs={12}>
            <Card style={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h5" gutterBottom color="primary">
                  🔢 Compteur Magique
                </Typography>
                
                <Typography variant="h2" style={{ margin: '20px 0', textAlign: 'center' }}>
                  {compteur}
                </Typography>
                
                <div style={{ textAlign: 'center' }}>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => setCompteur(compteur + 1)}
                    style={{ marginRight: 10, marginBottom: 10 }}
                  >
                    ➕ Augmenter
                  </Button>
                  
                  <Button 
                    variant="contained" 
                    color="secondary"
                    onClick={() => setCompteur(compteur - 1)}
                    style={{ marginRight: 10, marginBottom: 10 }}
                  >
                    ➖ Diminuer
                  </Button>
                  
                  <Button 
                    variant="outlined" 
                    onClick={() => setCompteur(0)}
                    style={{ marginBottom: 10 }}
                  >
                    🔄 Reset
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>

          {/* Carte des messages */}
          <Grid item md={6} xs={12}>
            <Card style={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h5" gutterBottom color="primary">
                  💬 Messages Aléatoires
                </Typography>
                
                <div style={{ 
                  backgroundColor: '#252525ff', 
                  padding: '20px', 
                  borderRadius: '8px',
                  margin: '20px 0',
                  textAlign: 'center',
                  minHeight: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Typography variant="h6">
                    {message}
                  </Typography>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <Button 
                    variant="contained" 
                    color="primary"
                    onClick={changerMessage}
                    style={{ marginBottom: 10 }}
                  >
                    🎲 Nouveau message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>

          {/* Carte d'informations */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom color="primary">
                  ℹ️ Ce que tu as appris
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item md={4} xs={12}>
                    <Typography variant="h6">✅ Création de plugin</Typography>
                    <Typography variant="body2">
                      Tu as utilisé le générateur Backstage pour créer un plugin
                    </Typography>
                  </Grid>
                  
                  <Grid item md={4} xs={12}>
                    <Typography variant="h6">⚛️ Composants React</Typography>
                    <Typography variant="body2">
                      Tu utilises useState pour gérer l'état de tes composants
                    </Typography>
                  </Grid>
                  
                  <Grid item md={4} xs={12}>
                    <Typography variant="h6">🎨 Interface utilisateur</Typography>
                    <Typography variant="body2">
                      Tu utilises Material-UI pour créer une belle interface
                    </Typography>
                  </Grid>
                </Grid>

                <Typography variant="body1" style={{ marginTop: 20, fontStyle: 'italic' }}>
                  🚀 Prochaine étape : Intégrer ce plugin dans ton app Backstage principale !
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Content>
    </Page>
  );
};