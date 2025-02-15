<template>
  <div class="notes">
    <div class="card has-background-success p-4 mb-5">
      <div class="field">
        <div class="control">
          <textarea class="textarea" placeholder="Add a new note"></textarea>
        </div>
      </div>
      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <button class="button is-link ">Add New Noe</button>
        </div>
      </div>
    </div>
    <div v-for="i in 3" class="card">
      <div class="card-content">
        <div class="content">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam
          vero, explicabo, consequuntur vel necessitatibus optio libero
          aspernatur iusto eius facere voluptates. Doloribus dicta quisquam
          consequatur, quam nemo minus id fugit.
        </div>
      </div>
      <footer class="card-footer">
        <a href="#" class="card-footer-item">Edit</a>
        <a href="#" class="card-footer-item">Delete</a>
      </footer>
    </div>
  </div>
</template>
