import { useState } from 'react';
import { Box, Grid, Typography, alpha } from '@mui/material';

import ProjectDetailModal from './ProjectDetailModal';
import projects from '../assets/projects.json';

const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={2}
      >
        <ProjectDetailModal
          project={activeProject}
          setProject={setActiveProject}
        />
        <Typography
          align="center"
          fontSize="24px"
          // fontWeight={300}
          textTransform="uppercase"
          variant="h5"
        >
          Projects
        </Typography>
        <Grid container spacing={2}>
          {projects.map((project) => (
            <Grid key={project.name} item xs={12} sm={6} md={4} lg={4} xl={3}>
              <Box
                position="relative"
                borderRadius={2}
                overflow="hidden"
                display="flex"
                flexDirection="column"
                gap={2}
                alignItems="center"
                sx={{
                  aspectRatio: '4/5',
                  cursor: 'pointer',
                  '&:hover img': {
                    transform: 'scale(1.05)',
                  },
                }}
                onClick={() => setActiveProject(project)}
              >
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  width="100%"
                  height="100%"
                >
                  <img
                    src={project.images[0]}
                    alt="project-img"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'all ease 0.3s',
                    }}
                  />
                </Box>
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  width="100%"
                  height="100%"
                  bgcolor={alpha('#000', 0.6)}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  sx={{ transition: 'all ease 0.3s' }}
                >
                  <Typography
                    fontSize={20}
                    fontWeight={600}
                    color="white"
                    align="center"
                    textTransform="uppercase"
                  >
                    {project.name}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Projects;
