import { Box, Dialog, Typography } from '@mui/material';

const ProjectDetailModal = ({ project, setProject }) => {
  const {
    name,
    description,
    time,
    images,
    videos,
    role,
    numberOfMembers,
    techStack,
    features,
    urls,
  } = project || {};

  if (!project) return null;

  return (
    <Dialog open onClose={() => setProject(null)}>
      <Box
        p={2}
        // bgcolor={grey[800]}
        display="flex"
        flexDirection="column"
        gap={2}
      >
        <Box display="flex" flexDirection="column">
          <Box
            px={1}
            py={0.5}
            bgcolor="black"
            color="white"
            alignSelf="flex-start"
            borderRadius={2}
          >
            <Typography fontSize={12}>{time}</Typography>
          </Box>
          <Typography fontSize={20} textTransform="uppercase">
            {name}
          </Typography>
          {urls && (
            <Box display="flex" gap={2} flexWrap="wrap">
              {urls.map((url) => (
                <Typography
                  key={url}
                  fontSize={13}
                  sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                  onClick={() => window.open(url)}
                >
                  {url.replace('https://', '')}
                </Typography>
              ))}
            </Box>
          )}
        </Box>
        <Box display="flex" flexDirection="column" gap={2}>
          <Typography fontSize={13} fontStyle="italic">
            {description}
          </Typography>
          <Box>
            <Typography>Features</Typography>
            {features?.map((feature) => (
              <Typography key={feature} fontSize={13}>
                • {feature}
              </Typography>
            ))}
          </Box>
        </Box>
        <Box>
          <Typography>Role: {role}</Typography>
          <Typography>Number of members: {numberOfMembers}</Typography>
        </Box>
        <Box display="flex" gap={1} flexWrap="wrap">
          {techStack?.map((tech) => (
            <Box key={tech} px={1} py={0.5} borderRadius={2} bgcolor="black">
              <Typography color="white" fontSize={12}>
                {tech}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box display="flex" flexDirection="column" gap={2}>
          {images?.map((item) => (
            <img
              key={item}
              src={item}
              alt="project-image"
              style={{ width: '100%', borderRadius: 4 }}
            />
          ))}
          {videos?.map((item) => (
            <video
              key={item}
              controls
              src={item}
              style={{ width: '100%', borderRadius: 4 }}
            />
          ))}
        </Box>
      </Box>
    </Dialog>
  );
};

export default ProjectDetailModal;
