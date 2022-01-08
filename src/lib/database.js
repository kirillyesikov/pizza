import { createClient } from '@supabase/supabase-js';

// probably should move these to an env.
const supabase = createClient(import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_API_KEY);

export async function fetchVotesByRepo(repoName) {
  const { data: recommendations, error } = await supabase
    .from('recommendations')
    .select('votes')
    .eq('repo_name', repoName);

  console.error(error);

  return recommendations[0].votes ? recommendations[0].votes : 0;
}

export async function updateVotesByRepo(repoName, votes) {
  const { data: recommendations, error } = await supabase
    .from('recommendations')
    .update({ votes: votes + 1 })
    .eq('repo_name', repoName);

  console.error(error);

  return recommendations[0].votes;
}