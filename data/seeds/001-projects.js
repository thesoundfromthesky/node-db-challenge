exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("projects")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("projects").insert([
        { name: "Making Food", description: "Hello zone" },
        { name: "Sample project", description: "sample desc" },
        { name: "Super computer project", description: "compe desc" }
      ]);
    });
};
