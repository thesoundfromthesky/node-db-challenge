exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("tasks")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("tasks").insert([
        {
          description: "task time",
          notes: "notes is not required",
          project_id: 1
        },
        {
          description: "task 2",
          notes: "notes is not required 2",
          project_id: 2
        },
        {
          description: "task 3",
          notes: "notes is not required 3",
          project_id: 3
        }
      ]);
    });
};
